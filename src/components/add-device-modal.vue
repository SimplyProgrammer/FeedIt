<template>
	<Modal title="Nove zariadenie" ref="modal">
		<h4>Nazov zariadenia:</h4>
		<ion-input type="text" placeholder="Nazov..." v-model="name" class="ion-padding" :class="{invalid : this.deviceProfiles.some(elm => elm.name == this.name)}"></ion-input>
		<h4 class="mt-1">Ip adresa:</h4>
		<ion-input type="text" placeholder="Ip adresa..." v-model="ip" class="ion-padding" :class="{invalid : this.deviceProfiles.some(elm => elm.ip == this.ip)}"></ion-input>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()">Zrusit</ion-button>
			<ion-button color="tertiary" @click="saveModal()">Pridat</ion-button>
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
		deviceProfiles: {
			type: Array,
			default: []
		}
	},

	data() {
		return {
			name: "",
			ip: ""
		}
	},

	methods: {
		async saveModal() {
			var message = !(this.name && this.ip) ? "Prosim vyplnte vsetky udaje!" : 
							this.deviceProfiles.some(elm => elm.name == this.name) ? "Zariadenie s tymto nazvom uz exsistuje!" : 
							this.deviceProfiles.some(elm => elm.ip == this.ip) ? "Zariadenie s touto IP uz existuje!" : undefined;
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