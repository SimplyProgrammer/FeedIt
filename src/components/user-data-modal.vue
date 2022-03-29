<template>
	<Modal title="Užívateľské dáta" ref="modal">
		<h4>Údaje o vašej sieti</h4>
		<p>Aplikácia potrebujeudaje údaje o vašej sieti aby vedel komunikovať so zariadeniami! Pametajte že vaše mobilné zariadenie musí byť na rovnakej sieti ako zariadenie!</p>
		<h6 class="mt-1">Názov vašej siete:</h6>
		<ion-input type="text" placeholder="Moja domaca siet..." v-model.trim="networkName" class="ion-padding"></ion-input>
		<h6 class="mt-1">Heslo vašej siete:</h6>
		<ion-input type="password" placeholder="Heslo domacej siete..." v-model.trim="networkPassword" class="ion-padding"></ion-input>

		<h4 class="mt-5">Vaše dáta</h4>
		<p>Skopírujte, preneste a vložte tento text do iného mobilného zariadenia pre synchronizáciu vašich dát o zariadeniach!</p>
		<textarea class="width-100" v-model.trim="data" :class="{invalid : !isValid()}"></textarea>
		<div class="d-flex">
			<ion-button color="light" class="small" @click="back()">
				<ion-icon :icon="icons.arrow"></ion-icon>
			</ion-button>
			<ion-button color="light" @click="paste()">Vložiť</ion-button>
			<ion-button color="light" @click="copy()">Kopírovať</ion-button>
		</div>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">Zrušiť</ion-button>
			<ion-button color="tertiary" @click="saveModal()" ref="save">
				<ion-icon v-if="confirm" :icon="icons.checkmarkSharp"></ion-icon>
				<div v-else>Potvrdiť</div> 
			</ion-button>
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
			oldData: localStorage.getItem("appData"),
			networkName: "",
			networkPassword: "",
			changeCount: 0,
			confirm: 0
		}
	},

	mounted() {
		var networkData = JSON.parse(localStorage.getItem("networkData"));
		if (networkData)
		{
			this.networkName = networkData.networkName;
			this.networkPassword = networkData.networkPassword;
		}
	},

	watch: {
		data: function(newV, oldV) {
			this.oldData = oldV;
			this.changeCount++;
			this.confirm = 0;
		}
	},

	methods: {
		isValid() {
			try {
				if (this.data)
				{ 
					var obj = JSON.parse(this.data);
					obj.forEach(element => {
						if (!element.ip || !element.name || !element.plans)
							return obj = false;
					});
					return obj;
				}
				else
					return [];
			} catch (e) {
				return false;
			}
		},

		async paste() {
			this.data = await navigator.clipboard.readText();

			return await this.toast("Text vložený!");
		},

		async copy() {
			navigator.clipboard.writeText(this.data);

			return await this.toast("Text skopírovaný!");
		},

		back() {
			this.data = this.oldData;
		},

		async saveModal() {
			const data = this.isValid();
			if (data)
			{
				if (this.changeCount && this.confirm++ <= 0)
					return;

				const networkData = {
					networkName: this.networkName,
					networkPassword: this.networkPassword
				};

				localStorage.setItem("networkData", JSON.stringify(networkData));
				return this.modalController.dismiss({
					data: this.changeCount ? data : undefined,
					networkData: networkData
				});
			}

			return await this.toast("Zadané dáta sú chybné!", "danger");
		},
	}
};
</script>

<style lang="scss" scoped>
p {
	font-size: 13px;
	margin-top: 8px;
}

h4, h6 {
	margin: 0;
}

h6 {
	font-size: 15.5px;
}

textarea {
	height: 220px;
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