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
				<Selection :values="days" ref="selection"/>
			</div>
		
			<div class="buttons-wrapper">
				<ion-button color="secondary" @click="closeModal()">Zrušiť</ion-button>
				<ion-button color="secondary" @click="saveModal()">Uložiť</ion-button>
			</div>
		</div>
		
	</ion-content>
</template>

<script>
import Selection from '@/components/selection.vue';

export default {
	// computed: {
	// 	canSave: function() {
	// 		console.log(this.$refs.selection?.activeValues?.length);
	// 		return this.$refs?.selection?.activeValues?.length > 0;
	// 	},
	// },

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
				"Pondelok",
				"Utorok",
				"Streda",
				"Štvrtok",
				"Piatok",
				"Sobota", 
				"Nedela"
			],
			time: "08:30"
		}
	},

	methods: {
		closeModal() {
			this.modalController.dismiss();
		},

		saveModal() {
			const days = this.$refs.selection.selectedValues;
			if (days.length) {
				this.modalController.dismiss({
					days: this.radicate(days),
					time: this.time,
				});
			}
		},

		radicate(selectedDays) {
			if (selectedDays.length == 1) {
				return this.dayValues[selectedDays[0]];
			}

			let isOrdered = true;
			
			selectedDays.forEach((day, index) => {
				if (selectedDays[index + 1] && day + 1 != selectedDays[index + 1]) {
					isOrdered = false;
					return false;
				}
			})

			const days = selectedDays.map((dayIndex) => this.dayValues[dayIndex].substring(0, 2));

			if (isOrdered) {
				return days[0] + " - " + days.slice(-1);
			}
			return days.join(", ");
		}
	},

	computed: {
		canSaveComp: function() {
			return this.$refs.selection.activeValues.length > 0;
		}
	},

	mounted() {
		this.canSave = this.canSaveComp;
	}
};
</script>

<style lang="scss" scoped>

</style>