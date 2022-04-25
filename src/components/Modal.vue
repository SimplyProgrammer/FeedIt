<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{title}}</ion-title>
			<ion-icon v-if="hasCloseButton" slot="end" :icon="icons.closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>

	<ion-content class="ion-padding">
		<div class="content">
			<slot>
			</slot>
		</div>
	</ion-content>

	<ion-footer>
		<ion-toolbar>
			<slot name="footer">
			</slot>
		</ion-toolbar>
	</ion-footer>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Title"
		},
		hasCloseButton: {
			type: Boolean,
			default: true
		}
	},
	
	methods: {
		closeModal() {
			this.$emit('closeClicked');
			this.modalController.dismiss();
		}
	},
}
</script>

<style lang="scss" scoped>

</style>