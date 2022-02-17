<template>
	<ion-page>
		<Header @addClicked="openDeviceModal" ref="header"/>
		<ion-content>
			<swiper v-bind="swiperSettings" ref="">
				<swiper-slide v-for="(device, i) in deviceProfiles" :key="i">
					<DeviceCard :class="{'full-height' : Object.keys(deviceProfiles).length == 1}" v-bind="device" />
				</swiper-slide>
				<!-- <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div> -->
			</swiper>
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
					name: "XY Feeder"
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

			// this.slideTo(this.deviceProfiles.length-1);
			this.deviceProfiles.push(data);
		},

		slideTo(i) {
			this.$refs.appSwiper.swiper.slideTo(i, 0);
		}
	},
}
</script>

<style lang="scss" scoped>

</style>