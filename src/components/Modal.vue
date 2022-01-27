<template>
	<ion-modal :is-open="isOpen" @didDismiss="close()">
		<ion-content>
			<ion-header>
				<ion-toolbar>
					<ion-buttons slot="end" v-if="hasCloseBtn">
						<ion-button @click="close()" shape="round">
							<ion-icon :icon="iicon('closeCircleOutline')"></ion-icon>
						</ion-button>
					</ion-buttons>
					<ion-title>{{title}}</ion-title> 
				</ion-toolbar>
			</ion-header>
			<slot>
			</slot>
		</ion-content>
	</ion-modal>
</template>

<script>
export default {
	props: ["hasCloseBtn", "title"],

	data() {
		return {
			isOpen: false
		}
	},

	methods: {
		open()
		{
			this.isOpen = true;
			this.$emit("onOpen");
		},

		close()
		{
			this.isOpen = false;
		}
	}
}
</script>

<style lang = "scss" scoped>
ion-button {
	--background-hover-opacity: 0;
}

ion-icon {
	font-size: 36px;
}
</style>