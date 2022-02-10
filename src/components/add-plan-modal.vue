<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Nový časový plán</ion-title>
			<ion-icon slot="end" :icon="icons.closeOutline" @click="closeModal()"></ion-icon>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<div class="content">
			<div>
				<div class="grid-item">
					<h4>Vyberte Čas:</h4>
					<ion-datetime class="time-picker" hour-cycle="h23" presentation="time" mode="md" :value="time" @ionChange="time = $event.target.value"></ion-datetime>
				</div>

				<h4>Vyberte dni:</h4>
				<Selection :data="days" :values="dayValues"/>
			</div>
		
			<div class="buttons-wrapper">
				<ion-button color="secondary" @click="closeModal()">Zrušiť</ion-button>
				<ion-button color="secondary"  :disabled="selectedDays.length <= 0"  @click="saveModal()">Uložiť</ion-button>
			</div>
		</div>
		
	</ion-content>
</template>

<script>
import Selection from '@/components/selection.vue';

export default {
	components: {
		Selection
	},

	data() {
		return {
			days: [
				"P",
				"U",
				"S",
				"Š",
				"P",
				"S", 
				"N"
			],
			dayValues: [
				"Po",
				"Ut",
				"St",
				"Št",
				"Pi",
				"So", 
				"Ne"
			],
			selectedDays: [],
			time: "08:30"
		}
	},

	methods: {
		closeModal() {
			this.modalController.dismiss();
		},

		toggleTagFilter(day) {
            if (this.selectedDays.includes(day)) {
                this.selectedDays = this.selectedDays.filter(item => item != day);
            } else {
                this.selectedDays.push(day);
            }
        },

		saveModal() {
			console.log(this.radicate(this.selectedDays));
			// if (this.selectedDays.length) {
			// 	this.modalController.dismiss({
			// 		days: this.selectedDays,
			// 		time: this.time,
			// 	});
			// }
		},

		radicate(selectedDays) {
			var result = "";
			if (selectedDays.length > 3) {
				var inRow = 0;
				for (let i = 0; i < selectedDays.length; i++) {
					
				}
			}
			else
				return selectedDays;
			return result;
		}
	},
};
</script>

<style lang="scss" scoped>

</style>