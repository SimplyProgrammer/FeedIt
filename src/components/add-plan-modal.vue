<template>
	<Modal :title="lang().timePlan" ref="modal">
		<div>
			<div class="grid-item">
				<h4>{{lang().choseTime + ":"}}</h4>
				<ion-datetime class="time-picker" size="cover" hour-cycle="h23" presentation="time" mode="md" :value="modalTime" @ionChange="modalTime = $event.target.value"></ion-datetime>
			</div>

			<h4>{{lang().choseDays + ":"}}</h4>
			<Selection :values="selectableDays.map(day => day.substring(0, 2))" ref="selection"/>
		</div>

		<template v-slot:footer>
			<div class="buttons-wrapper">
				<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">{{lang().cancel}}</ion-button>
				<ion-button color="tertiary" @click="saveModal()" ref="save">{{lang().confirm}}</ion-button>
			</div>
		</template>
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

			var message = days.length <= 0 ? this.lang().prompts.selectDay : undefined;

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