<template>
	<Modal :title="device ? lang().device : lang().newDevice" ref="modal">
		<p v-if="message">{{message}}</p>

		<h4>{{lang().deviceName + ":"}}</h4>
		<ion-input type="text" :placeholder="lang().name + '...'" v-model.trim="name" class="ion-padding" :class="{invalid : isNameAssigned()}" ref="nameInput"></ion-input>
		<h4 class="mt-1">{{lang().ip + ":"}}</h4>
		<ion-input type="text" :placeholder="lang().ip + '...'" v-model.trim="ip" class="ion-padding" :class="{invalid : isIpAssigned() || !isIpValid(ip) && ip.length}"></ion-input>

		<template v-slot:footer>
			<div class="buttons-wrapper">
				<ion-button color="secondary" @click="$refs.modal.closeModal()">{{lang().cancel}}</ion-button>
				<ion-button color="tertiary" @click="saveModal()">{{lang().confirm}}</ion-button>
			</div>
		</template>
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

		message: {
			type: String,
			default: ""
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

		async saveModal() {
			var message = !(this.name && this.ip) ? this.lang().prompts.fillAll : 
							this.isNameAssigned() ? this.lang().prompts.deviceNameAlreadyAdded : 
							this.isIpAssigned() ? this.lang().prompts.deviceIpAlreadyAdded : 
							!this.isIpValid(this.ip) ? this.lang().prompts.invalidIpFormat : undefined;

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
p {
	margin-top: 2px;
	margin-bottom: 20px;
}

h4 {
	margin-bottom: 0px;
}
</style>