<template>
	<Modal title="Uzivatelske data" ref="modal">
		<h4>Vase data</h4>
		<p>Skopirujte, preneste a vlozte tento text do ineho mobilneho zariadenia pre synchronizaciu vasich dat!</p>
		<textarea class="width-100" v-model.trim="data" :class="{invalid : !isValid()}"></textarea>
		<div class="d-flex">
			<ion-button color="light" class="small" @click="back()">
				<ion-icon :icon="icons.arrow"></ion-icon>
			</ion-button>
			<ion-button color="light" @click="paste()">Vlozit</ion-button>
			<ion-button color="light" @click="copy()">Kopirovat</ion-button>
		</div>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()" ref="save">Potvrdit</ion-button>
		</div>
	</Modal>
</template>

<script>

import Modal from '@/components/Modal.vue';

export default {
	components: {
		Modal
	},

	data() {
		return {
			data: localStorage.getItem("appData"),
			oldData: localStorage.getItem("appData")
		}
	},

	watch: {
		data: function(newV, oldV) {
			this.oldData = oldV;
		}
	},

	methods: {
		isValid() {
			try {
				if (this.data)
					return JSON.parse(this.data);
				else
					return [];
			} catch (e) {
				return false;
			}
		},

		async paste() {
			this.data = await navigator.clipboard.readText();

			const toast = await this.toastController.create({
				color: "success",
				message: "Text vlozeny!",
				duration: 2500
			});
			return toast.present();
		},

		async copy() {
			navigator.clipboard.writeText(this.data);

			const toast = await this.toastController.create({
				color: "success",
				message: "Text skopirovany!",
				duration: 2500
			});
			return toast.present();
		},

		back() {
			this.data = this.oldData;
		},

		async saveModal() {
			const data = this.isValid();
			if (data)
			{
				this.modalController.dismiss({
					data: data
				});
				return;
			}

			const toast = await this.toastController.create({
				color: "danger",
				message: "Zadane data su chybne!",
				duration: 2500
			});
			return toast.present();
		},
	}
};
</script>

<style lang="scss" scoped>
p {
	font-size: 13px;
	margin-top: 8px;
}

h4 {
	margin: 0;
}

textarea {
	height: 300px;
	border: 2px solid gray;
	--padding-start: 10px;
	transition: 0.2s;

	&.invalid {
		background: rgba(255, 0, 0, 0.22);
	}
}	


.d-flex {
	.small {
		flex: 0;
	}

	ion-button {
		flex: 1;
		height: 30px;
	}
}
</style>