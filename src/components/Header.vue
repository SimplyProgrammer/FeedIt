<template>
	<ion-header>
		<ion-toolbar>
			<ion-avatar slot="start" role="button" @click="$emit('profileClicked', tag)">
				<img :src="laftImg ?? '@/assets/imgs/avatar.svg'" alt="avatar"> <!-- ???????? -->
			</ion-avatar>
			
			<ion-avatar slot="end" role="button" @click="$emit('plusClicked', tag)">
				<img :src="rightImg ?? '@/assets/imgs/plus.svg'" alt="plus">
			</ion-avatar>
		</ion-toolbar>
	</ion-header>
</template>

<script>
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

	mounted() {
		console.log(this.laftImg ?? '@/assets/imgs/avatar.svg'); //toto to ide aj sa to da to src ale ono proste nie...
	},
}
</script>

<style lang="scss" scoped>
ion-avatar {
	height: 34px;
	width: 34px;
	transition: 0.2s;
}

ion-avatar:active {
	filter: brightness(88%);
}
</style>