<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Nove zariadenie</ion-title>
			<ion-icon slot="end" :icon="icons.closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<div class="content">
			<ion-input type="text" placeholder="Nazov zariadenia" v-model="name" class="ion-padding"></ion-input>
			<ion-input type="text" placeholder="Ip adresa zariadenia" v-model="ip" class="ion-padding"></ion-input>

			<div class="buttons-wrapper">
				<ion-button :disabled="!(name && ip)"  color="success">Pridat</ion-button>
			</div>
		</div>
		
	</ion-content>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			ip: ""
		}
	},

	methods: {
		closeModal() {
			this.modalController.dismiss();
		},
	},
};
</script>

<style lang="scss" scoped>
</style>