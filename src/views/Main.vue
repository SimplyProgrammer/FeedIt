<template>
	<ion-page>
		<Header @addClicked="openDeviceModal" ref="header"/>
		<ion-content>
			<swiper :modules="[Navigation, Pagination, Scrollbar, A11y]" :slides-per-view="1" :space-between="0" class="swiper" ref="swiper">
				<swiper-slide v-for="(device, i) in deviceProfiles" :key="i">
					<DeviceCard :data="device"/>
				</swiper-slide>
			</swiper>
		</ion-content>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import DeviceCard from '@/components/DeviceCard.vue';
import AddDeviceModal from '@/components/add-device-modal.vue';

export default {
	components: {
		Header,
		DeviceCard,
		AddDeviceModal,
		// Navigation,
		// Pagination,
		// Scrollbar,
		// A11y
	},

	data() {
		return {
			deviceProfiles: [
				{
					name: "XY Feeder"
				}
			],
		}
	},

	methods: {
		async openDeviceModal() {
			this.addDeviceModal = await this.modalController.create({
				component: AddDeviceModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1
			});
			this.addDeviceModal.present();

			const { data } = await this.addDeviceModal.onDidDismiss();
			if (!data) 
				return;

			this.deviceProfiles.push(data);
		},

		add()
		{
			this.deviceProfiles.push({
				name: this.deviceName,
				ip: this.deviceIp,
			});
		}
	},
}
</script>

<style lang="scss" scoped>
.swiper {
	height: 100%;
}
</style>