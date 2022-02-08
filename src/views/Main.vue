<template>
	<ion-page>
		<Header :leftImg="instructions[1].image" :rightImg="instructions[0].image" @plusClicked="$refs.addProd.open()" @profileClicked="$refs.profileLogin.open()" ref="header"/>

		<ion-content class = "ion-padding">
			<swiper v-if="deviceProfiles.length" :modules="[Navigation, Pagination, Scrollbar, A11y]" :slides-per-view="1" :space-between="50" class="all-100" ref="swiper">
				<swiper-slide v-for="(obj) in deviceProfiles" :key="obj.ip">
					<MainSlide :data="obj"/>
				</swiper-slide>
			</swiper>
			<div v-else>
				<ion-col>
					<ion-row v-for="ins in instructions" :key="ins.title">
						<ProfileCard :data="ins" @click="ins.click"/>
					</ion-row>
				</ion-col>
			</div>
		</ion-content> 

		<!-- Modals -->
		<Modal title="Add new device" hasCloseBtn=true css-class="modal-h-800" ref="addProd">
			<div class="ion-padding">
				<ion-input placeholder="Device name" v-model="deviceName"></ion-input>
				<ion-input placeholder="Device id/ip forma identifikacie..." v-model="deviceIp"></ion-input>
				<Schedule ref="addProdSchdule"/>
			</div>
			<ion-footer>
				<ion-toolbar>
					<ion-buttons>
						<ion-button :disabled="!(deviceName && deviceIp)" class="wideButton" fill="solid" color="primary" shape="round" @click="add">
							<b>Add</b>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-footer>
		</Modal>

		<Modal title="Login" hasCloseBtn=true ref="profileLogin">
			Work in progress...
		</Modal>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
import Modal from '@/components/Modal.vue';
import MainSlide from '@/components/MainSlide.vue';
import Schedule from '@/components/Schedule.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default {
	components: {
		Header, Modal, Navigation, Pagination, Scrollbar, A11y, MainSlide, Schedule, ProfileCard
	},

	data() {
		return {
			this: this,
			deviceName: "",
			deviceIp: "",
			deviceProfiles: [

			],

			instructions: [
				{
					image: '../assets/imgs/plus.svg',
					title: "Add device",
					description: "Add new device profile to manage your devices!",
					click: () => {
						this.$refs.addProd.open();
					}
				},
				{
					image: '../assets/imgs/avatar.svg',
					title: "Login",
					description: "Login with your user profile to synchronize your data acros multiple devices!",
					click: () => {
						this.$refs.profileLogin.open();
					}
				}
			]
		}
	},

	methods: {
		add()
		{
			this.deviceProfiles.push({
				name: this.deviceName,
				ip: this.deviceIp,
				timeStamps: this.$refs.addProdSchdule.timeStamps,
			});
			
			this.deviceName = this.deviceIp = "";
			this.$refs.addProdSchdule.timeStamps = [];
			this.$refs.addProd.close();
		}
	},

	mounted() {
		console.log(this.instructions[0].img);
	},

	watch: {
		
	}
}
</script>

<style lang="scss" scoped>
ion-row {
	max-width: 550px;
	margin: auto;
	margin-bottom: 30px;
}

ion-footer {
	position: absolute;
 	bottom: 0;
}
</style>