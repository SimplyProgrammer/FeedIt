<template>
	<Modal title="Casový plán" ref="modal">
		<div>
			<div class="grid-item">
				<h4>Vyberte Čas:</h4>
				<ion-datetime class="time-picker" hour-cycle="h23" presentation="time" mode="md" :value="modalTime" @ionChange="modalTime = $event.target.value"></ion-datetime>
			</div>

			<h4>Vyberte dni:</h4>
			<Selection :values="days.map(day => day.substring(0, 1))" @selected="daySelectionChange" ref="selection"/>
		</div>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()" :disabled="!canSave" ref="save">Uložiť</ion-button>
		</div>
	</Modal>
</template>

<script>
import Selection from '@/components/selection.vue';
import Modal from '@/components/Modal.vue';

export default {

	components: {
		Selection,
		Modal
	},

	props: {
		time: {
			type: String,
			default: "08:30"
		},
		selectedDays: {
			type: Array,
			default: []
		},
	},

	data() {
		return {
			days: [
				"Pondelok",
				"Utorok",
				"Streda",
				"Štvrtok",
				"Piatok",
				"Sobota", 
				"Nedela"
			],
			canSave: false
		}
	},

	created() {
		this.modalTime = this.time;
		setTimeout(() => {this.$refs.selection.activeValues = this.selectedDays}, 100);
	},

	methods: {
		saveModal() {
			const days = this.$refs.selection.selectedValues;
			if (days.length) {
				this.modalController.dismiss({
					days: days,
					formatedDays: this.formatSelection(days),
					time: this.modalTime,
				});
			}
		},

		daySelectionChange() {
			this.canSave = this.$refs.selection.activeValues.length > 0; 
		},

		formatSelection(selectedIndexes) {
			if (selectedIndexes.length == 1) {
				return this.days[selectedIndexes[0]];
			}

			let isOrdered = true;
			selectedIndexes.forEach((day, index) => {
				if (selectedIndexes[index + 1] && day + 1 != selectedIndexes[index + 1]) {
					isOrdered = false;
					return false;
				}
			})

			const days = selectedIndexes.map(daysIndex => this.days[daysIndex].substring(0, 2));
			if (isOrdered) {
				return days[0] + " - " + days.slice(-1);
			}
			return days.join(", ");
		}
	},

	mounted() {
		this.canSave = this.selectedDays.length > 0;
	}
};
</script>

<style lang="scss" scoped>

</style>