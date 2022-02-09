<template>
	<ion-header>
		<ion-toolbar>
			<img v-if="leftImg" :src="data.leftImg" slot="start">
			<img v-else src="@/assets/imgs/avatar.svg" slot="start">

			<ion-title>FeedIt</ion-title>
			
			<ion-icon :icon="icons.add" slot="end" @click="openDeviceModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
</template>

<script>
import AddDeviceModal from '@/components/add-device-modal.vue';

export default {
	props: {
		laftImg: {
			type: String,
			default: undefined
		},
		rightImg: {
			type: String,
			default: undefined
		}
	},

	methods: {
		async openDeviceModal() {
			const addDeviceModal = await this.modalController.create({
				component: AddDeviceModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1
			});
			return addDeviceModal.present();
		},
	},
}
</script>

<style lang="scss" scoped>
img {
	height: 34px;
	width: 34px;
	border-radius: 50%;
}

ion-icon {
	width: 25px;
	height: 25px;
}

ion-toolbar {
	height: 54px !important;
	max-height: 54px !important;
	min-height: 54px !important;
	--background: white;
	--padding-start: 10px;
	--padding-end: 10px;
	--padding-top: 10px;
	--padding-bottom: 10px;
	--border-color: transparent;
	box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.3);
}
</style>