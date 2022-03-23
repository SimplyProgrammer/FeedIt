<template>
	<ion-page>
		<Header @addClicked="openDeviceModal()" ref="header"/>
		<ion-content>
			<transition-group name="list">
				<div v-if="deviceProfiles.length" class="wh-100">
					<swiper v-bind="swiperSettings" ref="deviceSwiper">
						<swiper-slide v-for="(device, i) in deviceProfiles" :key="device">
							<DeviceCard v-bind="device" :class="{'full-height' : Object.keys(deviceProfiles).length == 1}" @removeRequest="confirmDeviceDelete(i)" @editRequest="openDeviceModal(i)" :ref="'slide' + i"/>
						</swiper-slide>
						<!-- <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div> -->
					</swiper>
				</div>
				<div v-else class="instructions">
					<h1>Vytajte!</h1>
					<div class="ion-padding" @click="openDeviceModal()">
						<h4>Nove zaradenie!</h4>
						<p>Pridajte vase zariadenie pre jednoduche nastavenie casovych planov!</p>
					</div>
					<div class="ion-padding">
						<h4>Uzivatelsky ucet!</h4>
						<p>Prihlaste sa alebo vytvorte vas uzivatelsky ucet pre synchronizaciu vasich dat na vsetkych vasich zariadeniach!</p>
					</div>
				</div>
			</transition-group>
		</ion-content>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
import DeviceCard from '@/components/DeviceCard.vue';
import AddDeviceModal from '@/components/add-device-modal.vue';

import { alertController } from '@ionic/vue';

export default {
	components: {
		Header,
		DeviceCard,
		AddDeviceModal,
	},

	data() {
		return {
			deviceProfiles: [
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

	created() {
		var appData = JSON.parse(localStorage.getItem("appData"));
		if (appData)
			this.deviceProfiles = appData;
	},

	watch: {
		deviceProfiles: {
			handler: function (val, oldVal) {
				localStorage.setItem("appData", JSON.stringify(val));
			},
			deep: true
		}
	},

	methods: {
		async confirmDeviceDelete(index) {
			const confirm = await alertController.create({
				header: "Vymazat zariadenie?",
				message: "Naozaj chcete trvalo odstranit toto zariadenie a vsetky jeho casove plany?",
				buttons: [
					"Zrusit", 
					{
						text: "Potvrdit",
						handler: () => {
							this.deviceProfiles.splice(index, 1);
						},
					}
				],
			});

       		await confirm.present();
		},

		async openDeviceModal(index = -1) {
			this.addDeviceModal = await this.modalController.create({
				component: AddDeviceModal,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: {
					device: index == -1 ? undefined : this.deviceProfiles[index],
					name: index == -1 ? "" : this.deviceProfiles[index].name,
					ip: index == -1 ? "" : this.deviceProfiles[index].ip,
					deviceProfiles: this.deviceProfiles
				}
			});
			this.addDeviceModal.present();

			const { data } = await this.addDeviceModal.onDidDismiss();
			if (!data) 
				return;

			if (index == -1)
			{
				data.plans = [];
				this.deviceProfiles.push(data);

				if (this.deviceProfiles.length > 1)
				{
					const swiper = this.$refs.deviceSwiper.$el.swiper;
					setTimeout(() => swiper.slideTo(this.deviceProfiles.length, 400), 10);
				}
			}
			else
			{
				this.deviceProfiles[index].name = data.name;
				this.deviceProfiles[index].ip = data.ip;
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.instructions {
	text-align: center;

	h1 { 
		font-size: 32px;
		font-weight: 900;
		margin-top: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid lightgray;
	}

	h4 { 
		font-weight: bold;
		margin-bottom: 5px;
	}

	p {
		margin: 0;
	}
}
</style>