<template>
	<Modal title="Nove zariadenie">
		<h4>Nazov zariadenia:</h4>
		<ion-input type="text" placeholder="Nazov..." v-model="name" class="ion-padding"></ion-input>
		<h4 class="mt-3">Ip adresa:</h4>
		<ion-input type="text" placeholder="Ip adresa..." v-model="ip" class="ion-padding"></ion-input>

		<div class="buttons-wrapper">
			<ion-button :disabled="!(name && ip)" color="success" @click="saveModal()">Pridat</ion-button>
		</div>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
	components: {
		Modal
	},

	data() {
		return {
			name: "",
			ip: ""
		}
	},

	methods: {
		saveModal() {
			this.modalController.dismiss({
				name: this.name,
				ip: this.ip
			});
		},
	}
};
</script>

<style lang="scss" scoped>
</style>