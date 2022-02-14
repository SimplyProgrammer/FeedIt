<template>
	<ion-card>
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

		<ion-button expand="block" class="mb-3" mode="md">Spustit teraz</ion-button>

		<ion-item lines="none" class="add-plan mb-2">
			<h2>Časové plány</h2>
			<ion-icon :icon="icons.add" slot="end" @click="openPlanModal()"></ion-icon>
		</ion-item>

		<div v-for="(plan, i) in plans" :key="i" class="plan d-flex ion-justify-content-between ion-align-items-center" @click.self="openPlanModal(i)">
			<p>{{plan.formatedDays}}</p>
			<div class="d-flex ion-align-items-center">
				<p>{{plan.time}}</p>
				<ion-toggle v-model="plan.active"></ion-toggle>
			</div>
		</div>
	</ion-card>
</template>

<script>
import AddPlanModal from '@/components/add-plan-modal.vue'

export default {
	props: {
		name: {
			type: String
		}
	},

	data() {
		return {
			plans: []
		}
	},

	methods: {
		async openPlanModal(index = -1) {
			this.addPlanModal = await this.modalController.create({
				component: AddPlanModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: {
					time: index == -1 ? undefined : this.plans[index].time,
					selectedDays: index == -1 ? undefined : this.plans[index].days,
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
	},
}
</script>

<style lang="scss" scoped>
ion-button {
	height: 45px;
	--border-radius: 14px;
}
</style>
