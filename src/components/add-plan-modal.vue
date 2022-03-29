<template>
	<Modal title="Casový plán" ref="modal">
		<div>
			<div class="grid-item">
				<h4>Vyberte čas:</h4>
				<ion-datetime class="time-picker" size="cover" hour-cycle="h23" presentation="time" mode="md" :value="modalTime" @ionChange="modalTime = $event.target.value"></ion-datetime>
			</div>

			<h4>Vyberte dni:</h4>
			<Selection :values="selectableDays.map(day => day.substring(0, 1))" ref="selection"/>
		</div>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()" ref="save">Potvrdiť</ion-button>
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
		selectableDays: {
			type: Array,
			default: []
		},

		time: {
			type: String,
			default: "08:30"
		},

		selectedDays: {
			type: Array,
			default: []
		}
	},

	created() {
		this.modalTime = this.time;
		setTimeout(() => {this.$refs.selection.activeValues = this.selectedDays}, 100);
	},

	methods: {
		async saveModal() {
			var days = this.$refs.selection.selectedValues;

			var message = days.length <= 0 ? "Prosím vyberte aspoň 1 deň!" : undefined;

			if (message)
			{
				return await this.toast(message, "danger");
			}

			this.modalController.dismiss({
				days: days,
				time: this.modalTime,
			});
		}
	},
};
</script>

<style lang="scss" scoped>
</style>