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
					<div class="w-fit d-flex ion-align-items-center margin-auto">
						<p>Status:</p>
						<div class="indicator"></div>
					</div>
				</div>
			</ion-card-header>

			<ion-button expand="block" class="mb-3" color="tertiary" @click.self="feed()">Spustit teraz</ion-button>

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
							<ion-item-option color="secondary" class="start">
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
import AddPlanModal from '@/components/add-plan-modal.vue'

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
			type:Array
		}
	},

	watch: {
		plans: {
			handler: function (val, oldVal) {
				console.log("Sending to: "+this.ip + " " + this.name);
				console.log(val);
			},
			deep: true
		}
	},

	methods: {
		async openPlanModal(index = -1) {
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
			console.log(index);
			this.plans.splice(index, 1);
		},

		reorderPlans(ev) {
			const itemMove = this.plans.splice(ev.detail.from, 1)[0];
			this.plans.splice(ev.detail.to, 0, itemMove);
			ev.detail.complete();
		},

		feed() {
			console.log("Sending feeding request...");
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
