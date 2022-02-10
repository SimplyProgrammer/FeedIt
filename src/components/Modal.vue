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
		},
	},
}
</script>

<style lang="scss" scoped>
ion-modal {
	ion-toolbar {
		--background: white;
		--padding-start: 10px;
		--padding-end: 10px;
		--padding-top: 10px;
		--padding-bottom: 10px;
		--border-color: transparent;
		box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.3);

		ion-title {
			font-weight: 400;
		}

		ion-icon {
			width: 20px;
			height: 20px;
		}
	}

	.content {
		width: 100%;
		height: fit-content;

		h4 {
			font-size: 20px;
			margin: 0 0 10px;
		}
	}
}
</style>