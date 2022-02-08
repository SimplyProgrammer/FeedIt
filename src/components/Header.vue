<template>
	<ion-header>
		<ion-toolbar>
			<img v-if="leftImg" :src="data.leftImg" slot="start">
			<img v-else src="@/assets/imgs/avatar.svg" slot="start">
			
			<ion-icon :icon="add" slot="end"></ion-icon>
		</ion-toolbar>
	</ion-header>
</template>

<script>
import { add } from 'ionicons/icons'

export default {
	props: {
		laftImg: {
			type: String,
			default: undefined
		},
		rightImg: {
			type: String,
			default: undefined
		}
	},

	data() {
		return {
			add,
		}
	}
}
</script>

<style lang="scss" scoped>
img {
	height: 34px;
	width: 34px;
	border-radius: 50%;
}

ion-icon {
	width: 25px;
	height: 25px;
}
</style>