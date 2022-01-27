<template>
	<ion-page>
		<Header @plusClicked="$refs.addProd.open()" @profileClicked="$refs.profileLogin.open()" ref="header"/>

		<ion-content>
			<ion-slides pager="true" class = "all-100">
				<ion-slide>
					<div class="container">
						<Schedule />
					</div>
				</ion-slide>
			</ion-slides>
		</ion-content>

		<Modal title="Add new device" hasCloseBtn=true css-class="modal-h-800" ref="addProd">
			<div class="ion-padding">
				<ion-input placeholder="Device name"></ion-input>
				<ion-input placeholder="Device id/ip forma identifikacie..."></ion-input>
			</div>
			<ion-footer>
				<ion-toolbar>
					<ion-buttons>
						<ion-button class="wideButton" fill="solid" color="primary" shape="round">
							<b>Add</b>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-footer>
		</Modal>

		<Modal title="Login" hasCloseBtn=true ref="profileLogin">

		</Modal>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
import Modal from '@/components/Modal.vue';
import Schedule from '@/components/Schedule.vue';

export default {
	components: {
		Header, Modal, Schedule
	},

	data() {
		return {
			deviceProfiles: [

			]
		}
	},

	methods: {
		log(log)
		{
			
		}
	},

	mounted() {
		console.log(this.$refs.addProd);
	},

	watch: {
		
	}
}
</script>

<style scoped>
ion-footer {
	position: absolute;
 	bottom: 0;
}
</style>