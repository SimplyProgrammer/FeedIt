<template>
	<ion-header>
		<ion-toolbar>
			<ion-item slot = "start">
				<ion-avatar role="button" @click="$emit('profileClicked', tag)">
					<img :src="leftImg" alt="left image">
				</ion-avatar>
			</ion-item>

			<ion-item slot = "end">
				<ion-avatar role="button" @click="$emit('plusClicked', tag)">
					<img :src="rightImg" alt="right image">
				</ion-avatar>
			</ion-item>
			<slot>
			</slot>
		</ion-toolbar>
	</ion-header>
</template>

<script>
export default {
	props: {
		leftImg: "",
		rightImg: ""
	},
}
</script>

<style lang="scss" scoped>
ion-title {
	text-align: center;
}

ion-item {
	--background: transparent;
	--inner-border-width: 0;
}

img {
	transition: 0.2s filter;
}

img:active {
	filter: brightness(88%);
}
</style>