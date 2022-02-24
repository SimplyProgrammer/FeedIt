<template>
	<ion-page>
		<Header @addClicked="openDeviceModal" ref="header"/>
		<ion-content>
			<div class="wh-100">
				<!-- <ion-fab horizontal="end" vertical="top" slot="fixed">
					<ion-fab-button>
						<ion-icon :icon="icons.menu"></ion-icon>
					</ion-fab-button>
					<ion-fab-list>
						<ion-fab-button color="light">
							<ion-icon :icon="icons.create"></ion-icon>
						</ion-fab-button>
						<ion-fab-button color="light">
							<ion-icon :icon="icons.trash"></ion-icon>
						</ion-fab-button>
					</ion-fab-list>
				</ion-fab> -->

				<swiper v-bind="swiperSettings" ref="deviceSwiper">
					<swiper-slide v-for="(device, i) in deviceProfiles" :key="i">
						<DeviceCard :class="{'full-height' : Object.keys(deviceProfiles).length == 1}" v-bind="device" />
					</swiper-slide>
					<!-- <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div> -->
				</swiper>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
import DeviceCard from '@/components/DeviceCard.vue';
import AddDeviceModal from '@/components/add-device-modal.vue';

export default {
	components: {
		Header,
		DeviceCard,
		AddDeviceModal,
	},

	data() {
		return {
			deviceProfiles: [
				{
					name: "XY Feeder",
					ip: "Najlepsia ipcka na svete",
					plans: []
				}
			],

			swiperSettings: {
				slidesPerView: 1,
				spaceBetween: 40,
				// loop: true,
				pagination: {
					clickable: true,
					// renderBullet: function (index, className) {
					// 	return '<span class="' + className + '">' + (index + 1) + "</span>";
					// },
				}, 
				// navigation: true,
				
			}
		}
	},

	methods: {
		async openDeviceModal() {
			this.addDeviceModal = await this.modalController.create({
				component: AddDeviceModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: {
					deviceProfiles: this.deviceProfiles
				}
			});
			this.addDeviceModal.present();

			const { data } = await this.addDeviceModal.onDidDismiss();
			if (!data) 
				return;

			data.plans ??= [];
			this.deviceProfiles.push(data);

			const swiper = this.$refs.deviceSwiper.$el.swiper;
			setTimeout(() => swiper.slideTo(this.deviceProfiles.length, 400), 10);
		}
	},
}
</script>

<style lang="scss" scoped>

</style>