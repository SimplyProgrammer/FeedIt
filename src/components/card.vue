<template>
	<ion-card>
		<ion-card-header>
			<img src="@/assets/imgs/krmitko1.png" alt="">
			<div class="description">
				<h1>XY Feeder</h1>
				<div class="w-fit d-flex ion-align-items-center margin-auto">
					<p>Pripojene:</p>
					<div class="indicator"></div>
				</div>
			</div>
		</ion-card-header>

		<ion-button expand="block">Spustit teraz</ion-button>

		<div class="time-plan d-flex ion-justify-content-between ion-align-items-center">
			<p>Pondelok</p>
			<div class="d-flex ion-align-items-center">
				<p>8:00</p>
				<ion-toggle></ion-toggle>
			</div>
		</div>

		<div class="time-plan d-flex ion-justify-content-between ion-align-items-center">
			<p>Pondelok</p>
			<div class="d-flex ion-align-items-center">
				<p>8:00</p>
				<ion-toggle></ion-toggle>
			</div>
		</div>

		<div class="time-plan d-flex ion-justify-content-between ion-align-items-center">
			<p>Pondelok</p>
			<div class="d-flex ion-align-items-center">
				<p>8:00</p>
				<ion-toggle></ion-toggle>
			</div>
		</div>
	</ion-card>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>

</style>
