<template>
	<ion-card class="device-card">
		<ion-fab>
			<ion-fab-button color="tertiary" class="main-fab-btn">
				<ion-icon :icon="icons.menu"></ion-icon>
			</ion-fab-button>
			<ion-fab-list>
				<ion-fab-button color="light" @click="$emit('editRequest')">
					<ion-icon :icon="icons.create"></ion-icon>
				</ion-fab-button>
				<ion-fab-button color="light" @click="$emit('removeRequest')">
					<ion-icon :icon="icons.trash"></ion-icon>
				</ion-fab-button>
			</ion-fab-list>
		</ion-fab>

		<div class="content">
			<ion-card-header>
				<img src="@/assets/imgs/krmitko1.png" alt="">
				<div class="description">
					<h1>{{name}}</h1>
					<div class="w-fit d-flex ion-align-items-center margin-auto" @click="showStatus()">
						<p>Status:</p>
						<div v-if="status == 0" class="indicator online"></div>
						<div v-else-if="status == 1" class="indicator offline"></div>
						<div v-else class="indicator error"></div>
					</div>
				</div>
			</ion-card-header>

			<ion-button expand="block" class="mb-3" color="tertiary" @click.self="feed()" :disabled="isFeeding">{{isFeeding ? "Davkovanie prebieha..." : "Spustit teraz"}}</ion-button>

			<ion-list lines="none">
				<ion-list-header class="mb-2">
					<ion-item>
						<h2 slot="start">Časové plány</h2>
						<ion-icon :icon="icons.add" slot="end" @click="openPlanModal()"></ion-icon>
					</ion-item>
				</ion-list-header>

				<transition-group name="list" tag="ion-reorder-group" class="swiper-no-swiping" @ionItemReorder="reorderPlans($event)" :disabled="false">
					<ion-item-sliding v-for="(plan, i) in plans" :key="plan">
						<ion-item @click.self="openPlanModal(i)">
							<p slot="start">{{plan.formatedDays}}</p>
							<div slot="end" class="d-flex ion-align-items-center">
								<p>{{plan.time}}</p>
								<ion-toggle v-model="plan.active"></ion-toggle>
							</div>
						</ion-item>

						<ion-item-options side="start">
							<ion-item-option v-if="plans.length > 1" color="secondary" class="start">
								<ion-reorder>
									<ion-icon :icon="icons.list"></ion-icon>
								</ion-reorder>
							</ion-item-option>
						</ion-item-options>

						<ion-item-options>
							<ion-item-option color="danger" @click="removePlan(i)">
								<ion-icon :icon="icons.trash"></ion-icon>
							</ion-item-option>
						</ion-item-options>
					</ion-item-sliding>
				</transition-group>
			</ion-list>
		</div>
	</ion-card>
</template>

<script>
import AddPlanModal from '@/components/add-plan-modal.vue';
import Axios from "axios";

export default {
	props: {
		name: {
			type: String
		},

		ip: {
			type: String
		},

		deviceProfiles: {
			type: Array
		},

		plans: {
			type: Array
		}
	},

	data() {
		return {
			isFeeding: false,
			status: 1
		}
	},

	watch: {
		plans: {
			handler: function(val, oldVal) {
				this.sendPlansToDevice();
			},
			deep: true
		},

		ip: function() {
			this.updateStatus(1000);
		},

		status: function() {
			if (this.status == 0)
				this.sendPlansToDevice();
		},
	},

	methods: {
		async openPlanModal(index = -1) {
			if (index == -1 && this.plans.length >= 12)
			{
				const toast = await this.toastController.create({
					color:  "danger",
					message: "Privela casovych planov!",
					duration: 2500
				});
				return toast.present();
			}
				
			this.addPlanModal = await this.modalController.create({
				component: AddPlanModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: {
					time: index == -1 ? "08:30" : this.plans[index].time,
					selectedDays: [...index == -1 ? (this.plans[this.plans.length-1]?.days ?? []) : this.plans[index].days],
				}
			});
			this.addPlanModal.present();

			const { data } = await this.addPlanModal.onDidDismiss();
			if (!data) 
				return;

			data.active = true;
			if (index == -1)
				this.plans.push(data);
			else
				this.plans[index] = data;
		},

		removePlan(index) {
			this.plans.splice(index, 1);
		},

		reorderPlans(ev) {
			const itemMove = this.plans.splice(ev.detail.from, 1)[0];
			this.plans.splice(ev.detail.to, 0, itemMove);
			ev.detail.complete();
		},

		urlifiedIp() {
			return /^https?:\/\//i.test(this.ip) ? this.ip : "http://" + this.ip;
		},

		async updateStatus(timeout = this.status ? 12000 : 1000) {
			const reply = await Axios.get(this.urlifiedIp() + "/", {timeout: timeout}).then(resp => {
				this.status = resp.data == "CodeX Pet Feeder zariadenie root!" ? 0 : "Adresa " + this.ip + " nieje kromitko CodeX Pet Feeder!";
			}).catch(error => {
				if (!error.response || error.code == 'ECONNABORTED')
					this.status = 1;
				else
					this.status = error.message ?? "Status 2";
			});
			return this.status;
		},

		async showStatus() {
			const status = this.status;
			const toast = await this.toastController.create({
                color: status == 0 ? "success" : "danger",
                message: status == 0 ? "Zariadenie je online!" : status != 1 ? ("Chyba konektivity zariadenia: " + status) : "Zariadenie je offline!",
                duration: 2500
            });
            toast.present();
		},

		async sendPlansToDevice() { // send plans data to device
			if (this.status)
				return;

			try
			{
				await Axios.get(this.urlifiedIp()+"/resetAll/?now");
				const activePlans = this.plans.filter(plan => plan.active);
				for (var i = 0; i < activePlans.length; i++)
				{
					const time = activePlans[i].time.split(":");
					const request = this.urlifiedIp()+"/plans/?set" + i + "&hours=" + time[0] + "&minute=" + time[1];
					for (var j = 0; j < activePlans[i].days.length; j++)
					{
						request += "&day" + activePlans[i].days[j];
					}
					// console.log(request); 
					await Axios.get(request);
				}
			}
			catch (err)
			{
				await this.updateStatus();
			}
		},

		async feed() { //feed now
			if (this.status)
				return this.showStatus();

			this.isFeeding = true;
			const reply = await Axios.get(this.urlifiedIp() + "/start/?now").catch(error => {
				if (!error.response || error.code == 'ECONNABORTED')
				{
					this.status = 1;
					return {errMessage: "Zariadenie je offline! Davkovanie zlyhalo!" /*+ msg.charAt(0).toUpperCase() + msg.slice(1)*/};
				}
				return {errMessage: "Davkovanie zlyhalo!" /*+ msg.charAt(0).toUpperCase() + msg.slice(1)*/};
			});
			this.isFeeding = false;

			const toast = await this.toastController.create({
				color: reply.errMessage ? "danger" : "success",
				message: reply.errMessage ?? "Davkovanie spustene!",
				duration: 2500
			});
			toast.present();
			
			return reply; //return in case of further Promise action is required 
		}
	},

	mounted() {
		//Keep alive loop for status update
		const self = this;
		this.keepAliveLoop = async function(time) {
			await self.updateStatus();	
 
			setTimeout(() => {
				if (self.keepAliveLoop)
					self.keepAliveLoop(2000);
			}, time);
		};
		this.keepAliveLoop();
	},

	unmounted() {
		this.keepAliveLoop = null;
	}
}
</script>

<style lang="scss" scoped>
</style>
