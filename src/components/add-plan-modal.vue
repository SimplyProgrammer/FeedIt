<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Nový časový plán</ion-title>
			<ion-icon slot="end" :icon="closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<div class="grid-item">
			<h2>Vyberte Čas:</h2>
			<ion-datetime class="time-picker" presentation="time" mode="md"></ion-datetime>
		</div>

		<h2>Vyberte dni:</h2>
	</ion-content>
</template>

<script>
import { modalController } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

export default {
	data() {
		return {
			closeOutline,
		};
	},

	methods: {
		closeModal() {
			modalController.dismiss();
		},
	},
};
</script>

<style lang="scss" scoped>
</style>