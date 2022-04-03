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

			<ion-button expand="block" class="mb-3" color="tertiary" @click.self="feed()" :disabled="isFeeding">{{isFeeding ? "Dávkovanie prebieha..." : "Spustiť teraz"}}</ion-button>

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
							<p slot="start" @click="openPlanModal(i)">{{formatSelection(selectableDays, plan.days)}}</p>
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
			selectableDays: [
				"Pondelok",
				"Utorok",
				"Streda",
				"Štvrtok",
				"Piatok",
				"Sobota", 
				"Nedela"
			],
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
			this.updateStatus(1500);
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
				return await this.toast("Priveľa časových plánov!", "danger");
			}
				
			this.addPlanModal = await this.modal(AddPlanModal, {
				selectableDays: this.selectableDays,
				time: index == -1 || !/^\d\d\:\d\d$/.test(this.plans[index].time) ? "08:30" : this.plans[index].time,
				selectedDays: [...(index == -1 ? this.plans[this.plans.length-1]?.days : this.plans[index]?.days) ?? []],
			});

			const { data } = await this.addPlanModal.onDidDismiss();
			if (!data) 
				return;

			if (index == -1)
			{
				data.active = true;
				this.plans.push(data);
			}
			else
			{
				this.plans[index].days = data.days;
				this.plans[index].time = data.time;
			}
		},

		formatSelection(array, selectedIndexes) { //used for formating selected days into string
			selectedIndexes = [...new Set(selectedIndexes)];
			if (selectedIndexes.length == 1) 
				return array[selectedIndexes[0]];

			let isOrdered = true;
			for (var i = 0, oldValue = selectedIndexes[i] - 1; i < selectedIndexes.length; i++)
			{	
				if (oldValue + 1 != selectedIndexes[i])
				{
					isOrdered = false;
					break;
				}
				oldValue = selectedIndexes[i];
			}

			const days = selectedIndexes.map(daysIndex => array[daysIndex]?.substring(0, 2));
			if (isOrdered) 
				return days[0] + " - " + days.slice(-1);
			return days.join(", ");
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
			return /^https?:\/\//i.test(this.ip) ? this.ip : this.http + "://" + this.ip;
		},

		async updateStatus(timeout = this.status ? 12000 : 1500) { //update status acording to device "root" response...
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
			const message = this.status == 0 ? "Zariadenie je online!" : this.status != 1 ? ("Chyba konektivity zariadenia: " + this.status) : "Zariadenie je offline!";
			await this.toast(message, this.status == 0 ? "success" : "danger");
			return message;
		},

		async sendPlansToDevice() { //send plans data to device
			if (this.status)
				return;

			try
			{
				const urlifiedIp = this.urlifiedIp();

				await Axios.get(urlifiedIp + "/resetAll/?now");
				const activePlans = this.plans.filter(plan => plan.active);
				for (var i = 0; i < activePlans.length; i++)
				{
					const time = activePlans[i].time.split(":");
					const request = urlifiedIp + "/plans/?set" + i + "&hour=" + time[0] + "&minute=" + time[1];
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
					return {errMessage: "Zariadenie je offline! Dávkovanie zlyhalo!" /*+ msg.charAt(0).toUpperCase() + msg.slice(1)*/};
				}
				return {errMessage: "Dávkovanie zlyhalo!" /*+ msg.charAt(0).toUpperCase() + msg.slice(1)*/};
			});
			this.isFeeding = false;

			await this.toast(reply.errMessage ?? "Dávkovanie spustené!", reply.errMessage ? "danger" : "success");
			
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
