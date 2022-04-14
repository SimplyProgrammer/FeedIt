<template>
	<ion-page>
		<Header title="FeedIt" @addClicked="openDeviceModal()" @profileClicked="openUserDataModal()" ref="header"/>
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
					<h1>{{lang().welcome + "!"}}</h1>
					<div class="ion-padding" @click="openUserDataModal()">
						<h4>{{lang().userData + "!"}}</h4>
						<p>{{lang().userDataMessage}}</p>
						<p class="mt-1">{{lang().userDataMessage2}}</p>
					</div>
					<div class="ion-padding" @click="openDeviceModal()">
						<h4>{{lang().newDevice + "!"}}</h4>
						<p>{{lang().timeplansMessage}}</p>
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
import UserDataModal from '@/components/user-data-modal';

import { alertController } from '@ionic/vue';
import Axios from "axios";

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

	watch: {
		deviceProfiles: {
			handler: function (val, oldVal) {
				localStorage.setItem("appData", JSON.stringify(val));
			},
			deep: true
		}
	},

	methods: {
		
		/*async test() {
			console.log("google:" + await Axios.get("https://www.google.com/"));
			console.log("speed test:" + await Axios.get("https://www.speedtest.net/"));
		},*/

		encrypt(str, mode = 1) {
			var encStr = "";
			for (let index = 0; index < str.length; index++) {
				encStr += String.fromCharCode(str.charCodeAt(index) + (index % 2 == 0 ? 5 : 10) * mode);
			}
			return encStr;
		},

		async confirmDeviceDelete(index) {
			const confirm = await alertController.create({
				header: this.lang().deleteDevice + "?",
				message: this.lang().confirmDeleteDevice,
				buttons: [
					this.lang().cancel, 
					{
						text: this.lang().confirm,
						handler: () => {
							this.deviceProfiles.splice(index, 1);
						},
					}
				],
			});

			await confirm.present();
		},

		async openUserDataModal() {
			this.userDataModal = await this.modal(UserDataModal);

			const { data } = await this.userDataModal.onDidDismiss();
			if (!data)
				return;

			this.networkData = data.networkData;
			if (data.data)
				this.deviceProfiles = data.data;
		},

		async openDeviceModal(index = -1) {
			this.addDeviceModal = await this.modal(AddDeviceModal, {
				device: index == -1 ? undefined : this.deviceProfiles[index],
				name: index == -1 ? "" : this.deviceProfiles[index].name,
				ip: index == -1 ? "" : this.deviceProfiles[index].ip,
				deviceProfiles: this.deviceProfiles
			});

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

	async created() {
		// await this.test();

		var appData = JSON.parse(localStorage.getItem("appData"));
		if (appData)
			this.deviceProfiles = appData;

		var networkData = JSON.parse(localStorage.getItem("networkData"));
		if (networkData)
			this.networkData = networkData;

		const self = this, newDeviceConnectionLoop = async function(time) {
			if (self.networkData?.networkName && self.networkData?.networkPassword)
				await Axios.get(self.http + "://192.168.4.1/wifiData/?set&arg0=" + encodeURIComponent(self.encrypt(self.networkData.networkName)) + "&arg1=" + encodeURIComponent(self.encrypt(self.networkData.networkPassword)), {timeout: 14000}).then(res => res).catch(err => {});
 
			setTimeout(() => {
				newDeviceConnectionLoop(4000);
			}, time);
		};;
		newDeviceConnectionLoop();
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