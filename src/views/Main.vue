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
				<div v-else class="instructions ion-padding">
					<transition name="list">
						<div v-if="!networkData?.networkName">
							<img src="@/assets/imgs/icon.png" alt="device img">
							<h4>{{lang().networkDataInstruction}}</h4>
							<div class="ion-padding mt-7" @click="openUserDataModal()">
								<ion-button expand="block">{{lang('networkDataBtn')}}</ion-button>
							</div>
						</div>
						<div v-else>
							<img src="@/assets/imgs/icon.png" alt="device img">
							<h4>{{lang().deviceInstruction}}</h4>
							<div class="ion-padding mt-7" @click="openDeviceModal()">
								<ion-button expand="block">{{lang('deviceAdd')}}</ion-button>
							</div>
						</div>
					</transition>
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

			networkData: {},

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
		
		// async test() {
		// 	console.log("google:" + await Axios.get("https://www.google.com/"));
		// 	console.log("speed test:" + await Axios.get("https://www.speedtest.net/"));
		// },

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

			if (data.refreshRequired)
				this.$router.go(0);
		},

		async openDeviceModal(index = -1, ip = "", message = null) {
			this.addDeviceModal = await this.modal(AddDeviceModal, {
				device: index == -1 ? undefined : this.deviceProfiles[index],
				name: index == -1 ? "" : this.deviceProfiles[index].name,
				ip: index == -1 ? ip : this.deviceProfiles[index].ip,
				deviceProfiles: this.deviceProfiles,
				message: message
			});

			const { data } = await this.addDeviceModal.onDidDismiss();
			if (!data) 
				return;

			if (index == -1)
			{
				data.plans = [];
				data.emissionData = {
					size: 1
				};
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
		const self = this;
		document.onkeypress = async function(ev) { //for debug
			if (ev.key == "`")
			{
				const confirm = await alertController.create({
					header: "Change HTTP client?",
					buttons: [
						{
							text: "Fetch (no cors)",
							handler: () => {
								self.setHttpClient(0);
							},
						},
						{
							text: "Axios",
							handler: () => {
								self.setHttpClient(1);
							},
						}
					],
				});

				await confirm.present();
			}
		}

		var appData = JSON.parse(localStorage.getItem("appData"));
		if (appData)
		{
			(this.deviceProfiles = appData).forEach(elm => {
				elm.emissionData ??= {
					size: 1
				};
			});
		}

		var networkData = JSON.parse(localStorage.getItem("networkData"));
		if (networkData)
			this.networkData = networkData;

		const newDeviceConnectionLoop = async function(time) {
			if (self.networkData?.networkName)
			{
				const args = ["&arg0=" + encodeURIComponent(self.encrypt(self.networkData.networkName)), "&arg1=" + encodeURIComponent(self.encrypt(self.networkData.networkPassword))];
				const wifiDataQuery = "?set" + (Math.random() > 0.5 ? args[0] + args[1] : args[1] + args[0]);

				await self.httpClient(self.http + "://192.168.4.1/wifiData/" + wifiDataQuery, {timeout: 14000}).then(async resp => {
					if (self.isIpValid(resp.data) && resp.data != "0.0.0.0" && !self.deviceProfiles.some(elm => elm.ip == resp.data))
						await self.openDeviceModal(-1, resp.data, self.lang().deviceConnected);
				}).catch(err => {});
			}
 
			setTimeout(() => {
				newDeviceConnectionLoop(4000);
			}, time);
		};
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

	ion-button {
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 18px;
	}
}
</style>