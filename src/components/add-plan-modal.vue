<template>
	<Modal title="Casový plán" ref="modal">
		<div>
			<div class="grid-item">
				<h4>Vyberte Čas:</h4>
				<ion-datetime class="time-picker" hour-cycle="h23" presentation="time" mode="md" :value="modalTime" @ionChange="modalTime = $event.target.value"></ion-datetime>
			</div>

			<h4>Vyberte dni:</h4>
			<Selection :values="days.map(day => day.substring(0, 1))" ref="selection"/>
		</div>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()" ref="save">Potvrdit</ion-button>
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
		}
	},

	created() {
		this.modalTime = this.time;
		setTimeout(() => {this.$refs.selection.activeValues = this.selectedDays}, 100);
	},

	methods: {
		async saveModal() {
			const days = this.$refs.selection.selectedValues;

			var message = days.length <= 0 ? "Prosim vyberte aspon 1 den!" : undefined;

			if (message)
			{
				const toast = await this.toastController.create({
					color: "danger",
					message: message,
					duration: 2500
				});
				return toast.present();
			}

			this.modalController.dismiss({
				days: days,
				formatedDays: this.formatSelection(days),
				time: this.modalTime,
			});
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
};
</script>

<style lang="scss" scoped>

</style>