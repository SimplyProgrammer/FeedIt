<template>
	<ion-card>
		<img :src="data.img" alt="user icon">
		<ion-card-content>
			<ion-card-title>{{data.title}}</ion-card-title>
			<p>{{data.description}}</p>
		</ion-card-content>
	</ion-card>
</template>

<script>
export default {
	props: {
		data: {}
	}
}
</script>

<style lang="scss" scoped>
ion-card {
	width: 100%;
	height: 150px;
	padding: 5px;
	background: gray;
	text-align: left;

	transition: 0.2s filter;
	display: flex;

	ion-card-content {
		align-self: center;
		width: 100%;
		height: 100%;
		color:	white;
		
		ion-card-title {
			--color: white;
			font-size: 30px;
			font-weight: bold;
			border-bottom: 1px solid white;
		}

		p {
			margin-top: 6px;
		}
	}

	img {
		align-self: center;
		height: 80%;
		margin-left: 10px;
		border-radius: 500px;
	}

	&:active {
		filter: brightness(88%);
	}
}
</style>
