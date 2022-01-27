<template>
	<ion-header>
		<ion-toolbar>
			<ion-item slot = "start">
				<ion-avatar role="button" @click="$emit('profileClicked', tag)">
					<img src="../assets/imgs/avatar.svg" alt="user profile">
				</ion-avatar>
			</ion-item>

			<ion-item slot = "end">
				<ion-avatar role="button" @click="$emit('plusClicked', tag)">
					<img src="../assets/imgs/plus.svg" alt="add device">
				</ion-avatar>
			</ion-item>
			<slot>
			</slot>
		</ion-toolbar>
	</ion-header>
</template>

<script>
export default {

	data() {
		return {
			lol: "aaaaa"
		}
	},

	methods: {
		lola(asda) {
			console.log(asda);
		}
	}
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