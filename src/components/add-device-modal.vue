<template>
	<Modal :title="device ? 'Zariadenie' : 'Nove zariadenie'" ref="modal">
		<h4>Nazov zariadenia:</h4>
		<ion-input type="text" placeholder="Nazov..." v-model.trim="name" class="ion-padding" :class="{invalid : isNameInvalid()}" ref="nameInput"></ion-input>
		<h4 class="mt-1">Ip adresa:</h4>
		<ion-input type="text" placeholder="Ip adresa..." v-model.trim="ip" class="ion-padding" :class="{invalid : isIpInvalid()}"></ion-input>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()">Zrusit</ion-button>
			<ion-button color="tertiary" @click="saveModal()">Potvrdit</ion-button>
		</div>

		<!-- <div v-if="!(name && ip)" class="error">
			Vyplnte vsetky udaje!
		</div> -->
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { toastController } from '@ionic/vue';

export default {
	components: {
		Modal
	},

	props: {
		name: {
			type: String,
			default: ""
		},

		ip: {
			type: String,
			default: ""
		},

		device: {
			type: Object,
			default: undefined
		},

		deviceProfiles: {
			type: Array,
			default: []
		}
	},

	mounted() {
		setTimeout(() => this.$refs.nameInput.$el.setFocus(), 800);
	},

	methods: {
		isNameInvalid() {
			return this.deviceProfiles.some(elm => elm.name == this.name) && this.name != this.device?.name;
		},

		isIpInvalid() {
			return this.deviceProfiles.some(elm => elm.ip == this.ip) && this.ip != this.device?.ip
		},

		async saveModal() {
			var message = !(this.name && this.ip) ? "Prosim vyplnte vsetky udaje!" : 
							this.isNameInvalid() ? "Zariadenie s tymto nazvom uz exsistuje!" : 
							this.isIpInvalid() ? "Zariadenie s touto IP uz existuje!" : undefined;

			if (message)
			{
				const toast = await toastController.create({
					color: "danger",
					message: message,
					duration: 2500
				});
				return toast.present();
			}

			this.modalController.dismiss({
				name: this.name,
				ip: this.ip
			});
		},
	}
};
</script>

<style lang="scss" scoped>
h4 {
	margin-bottom: 0px;
}
</style>