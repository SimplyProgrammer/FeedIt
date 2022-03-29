<template>
	<Modal :title="device ? 'Zariadenie' : 'Nové zariadenie'" ref="modal">
		<h4>Názov zariadenia:</h4>
		<ion-input type="text" placeholder="Názov..." v-model.trim="name" class="ion-padding" :class="{invalid : isNameAssigned()}" ref="nameInput"></ion-input>
		<h4 class="mt-1">IP adresa:</h4>
		<ion-input type="text" placeholder="IP adresa..." v-model.trim="ip" class="ion-padding" :class="{invalid : isIpAssigned() || !isIpValid(ip) && ip.length}"></ion-input>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()">Potvrdiť</ion-button>
		</div>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

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

		networkName: {
			type: String,
			default: ""
		},

		networkPassword: {
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
		isNameAssigned() {
			return this.deviceProfiles.some(elm => elm.name == this.name) && this.name != this.device?.name;
		},

		isIpAssigned() {
			return this.deviceProfiles.some(elm => elm.ip == this.ip) && this.ip != this.device?.ip
		},

		isIpValid(str) {
			return /^(https?:\/\/)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\:[0-9]?[0-9]?[0-9]?[0-9]?)?$/.test(str);
		},

		async saveModal() {
			var message = !(this.name && this.ip) ? "Prosím vyplňte všetky údaje!" : 
							this.isNameAssigned() ? "Zariadenie s týmto názvom už exsistuje!" : 
							this.isIpAssigned() ? "Zariadenie s touto IP už existuje!" : 
							!this.isIpValid(this.ip) ? "Nesprávny formát ip IP adresy!" : undefined;

			if (message)
			{
				return await this.toast(message, "danger");
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