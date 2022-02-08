<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Nový časový plán</ion-title>
			<ion-icon slot="end" :icon="closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		{{ content }}
	</ion-content>
</template>

<script>
import { modalController } 	from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'

export default {
	data() {
		return {
			closeOutline,
		}
	},

	methods: {
		closeModal() {
			modalController.dismiss()
		}
	},
}
</script>

<style lang="scss" scoped>

</style>