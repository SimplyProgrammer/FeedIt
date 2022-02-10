<template>
	<ion-card>
		<ion-card-header>
			<img src="@/assets/imgs/krmitko1.png" alt="">
			<div class="description">
				<h1>XY Feeder</h1>
				<div class="w-fit d-flex ion-align-items-center margin-auto">
					<p>Pripojene:</p>
					<div class="indicator"></div>
				</div>
			</div>
		</ion-card-header>

		<ion-button expand="block" class="mb-3">Spustit teraz</ion-button>

		<ion-item lines="none" class="add-plan mb-2">
			<h2>Časové plány</h2>
			<ion-icon :icon="icons.add" slot="end" @click="openPlanModal()"></ion-icon>
		</ion-item>

		<div v-for="(plan, i) in plans" :key="i" class="plan d-flex ion-justify-content-between ion-align-items-center" @click.self="openPlanEditModal(i)">
			<p>{{plan.days}}</p>
			<div class="d-flex ion-align-items-center">
				<p>{{plan.time}}</p>
				<ion-toggle></ion-toggle>
			</div>
		</div>
	</ion-card>
</template>

<script>
import AddPlanModal from '@/components/add-plan-modal.vue'

export default {
	data() {
		return {
			plans: []
		}
	},

	methods: {
		async openPlanModal() {
			this.addPlanModal = await this.modalController.create({
				component: AddPlanModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1
			});
			this.addPlanModal.present();

			const { data } = await this.addPlanModal.onDidDismiss();
			if (!data) 
				return;

			const {days, time} = data;
			this.plans.push({days, time});
		},

		async openPlanEditModal(index) {
			this.addPlanModal = await this.modalController.create({
				component: AddPlanModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: {
					time: this.plans[index].time
				}
			});
			this.addPlanModal.present();
			console.log(this.addPlanModal);

			const { data } = await this.addPlanModal.onDidDismiss();
			if (!data) 
				return;

			const {days, time} = data;
			this.plans[index] = {days, time};
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
