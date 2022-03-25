<template>
	<ion-header>
		<ion-toolbar>
			<!-- <img v-if="leftImg" :src="data.leftImg" slot="start" @click="$emit('profileClicked')"> -->
			<img src="@/assets/imgs/avatar.svg" slot="start" @click="$emit('profileClicked')">

			<ion-title>{{title}}</ion-title>
			
			<ion-icon :icon="icons.add" slot="end" @click="$emit('addClicked')"></ion-icon>
		</ion-toolbar>
	</ion-header>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ""
		}
	}
}
</script>

<style lang="scss" scoped>
ion-toolbar {
	height: 54px !important;
	max-height: 54px !important;
	min-height: 54px !important;
	--background: white;
	--padding-start: 10px;
	--padding-end: 10px;
	--padding-top: 10px;
	--padding-bottom: 10px;
	--border-color: transparent;
	box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.3);

	img {
		height: 34px;
		width: 34px;
		border-radius: 50%;
		transition: 0.1s;

		&:active {
			filter: contrast(60%);
		}
	}

	ion-icon {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		transition: 0.1s;

		&:active {
			background: var(--ion-color-light);
		}
	}
}
</style>