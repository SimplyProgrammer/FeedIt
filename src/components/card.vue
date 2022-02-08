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
			<ion-icon :icon="add" slot="end" @click="openPlanModal()"></ion-icon>
		</ion-item>

		<div class="plan d-flex ion-justify-content-between ion-align-items-center">
			<p>Pondelok:</p>
			<div class="d-flex ion-align-items-center">
				<p>8:00</p>
				<ion-toggle></ion-toggle>
			</div>
		</div>
	</ion-card>
</template>

<script>
import { modalController } from '@ionic/vue';
import AddPlanModal from '@/components/add-plan-modal.vue'
import { add } from 'ionicons/icons'

export default {
	data() {
		return {
			add,
		}
	},

	methods: {
		async openPlanModal() {
			const addPlanModal = await modalController
				.create({
					component: AddPlanModal,
					cssClass: 'app-plan-modal',
				})
			return addPlanModal.present();
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
