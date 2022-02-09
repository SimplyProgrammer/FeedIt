<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Nový časový plán</ion-title>
			<ion-icon slot="end" :icon="icons.closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<div class="content">
			<div class="grid-item">
				<h2>Vyberte Čas:</h2>
				<ion-datetime class="time-picker" hour-cycle="h23" presentation="time" mode="md"></ion-datetime>
			</div>

			<h2>Vyberte dni:</h2>
			<div class="day-selector d-flex ion-justify-content-evenly">
				<div class="day">
					<div class="day-name-wrapper">
						<p>P</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper">
						<p>U</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper">
						<p>S</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper">
						<p>Š</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper">
						<p>P</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper">
						<p>S</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
				<div class="day">
					<div class="day-name-wrapper active-day">
						<p>N</p>
					</div>
					<ion-icon :icon="icons.ellipse"></ion-icon>
				</div>
			</div>

			<div class="buttons-wrapper">
				<ion-button color="danger">Zrušiť</ion-button>
				<ion-button color="success">Uložiť</ion-button>
			</div>
		</div>
		
	</ion-content>
</template>

<script>
export default {
	methods: {
		closeModal() {
			this.modalController.dismiss();
		},
	},
};
</script>

<style lang="scss" scoped>
</style>