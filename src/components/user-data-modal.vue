<template>
	<Modal :title="lang().userData" ref="modal">
		<h4>{{lang().networkData + ":"}}</h4>
		<p>{{lang().networkDataMessage}}</p>
		<h6 class="mt-1">{{lang().networkName + ":"}}</h6>
		<ion-input type="text" :placeholder="lang().netowrkNamePlaceholder + '...'" v-model.trim="networkName" class="ion-padding"></ion-input>
		<h6 class="mt-1">{{lang().networkPassword + ":"}}</h6>
		<ion-input type="password" :placeholder="lang().networkPasswordPlaceholder + '...'" v-model.trim="networkPassword" class="ion-padding"></ion-input>

		<h4 class="mt-5">{{lang().yourData + ":"}}</h4>
		<p>{{lang().yourDataMessage}}</p>
		<div class="data">
			<!-- <ion-button color="light" class="small" @click="back()">
				<ion-icon :icon="icons.arrow"></ion-icon>
			</ion-button> -->
			<ion-button color="primary" expand="block" @click="copy()">{{lang().copy}}</ion-button>
			<div class="d-flex ion-align-items-center">
				<textarea v-model.trim="data" :placeholder="lang('yourDataPlaceholder') + '...' " :class="{invalid : !isValid(), none: pasteCount <= 0}" ref="textarea"></textarea>
				<ion-button color="primary" expand="block" @click="pasteCount > 0 ? paste() : pasteCount++">{{lang().paste}}</ion-button>
			</div>
		</div>

		<h4 class="mt-5">{{lang().language + ":"}}</h4>
		<ion-radio-group v-model="lng">
			<ion-item v-for="lang in Object.keys(langs)" :key="lang" class="radio" lines="none">
				<ion-label>{{langs[lang].langName + " - " + lang.toUpperCase()}}</ion-label>
				<ion-radio slot="start" :value="lang" mode="md"></ion-radio>
			</ion-item>
		</ion-radio-group>
		<!-- <ion-select interface="action-sheet" v-model="lng" :ok-text="lang().confirm" :cancel-text="lang().cancel">
			<ion-select-option v-for="lang in Object.keys(langs)" :value="lang" :key="lang">{{langs[lang].langName + " - " + lang.toUpperCase()}}</ion-select-option>
		</ion-select> -->

		<textarea class="copyBuffer" readonly ref="copyBuffer" />

		<template v-slot:footer>
			<div class="buttons-wrapper">
				<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">{{lang().cancel}}</ion-button>
				<ion-button color="tertiary" @click="saveModal()" ref="save">{{lang().confirm}}</ion-button>
			</div>
		</template>
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
			data: [],
			// oldData: localStorage.getItem("appData"),
			networkName: "",
			networkPassword: "",
			pasteCount: 0,
			changeCount: 0,
			lng: localStorage.getItem("lang") ?? "en",
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
			// this.oldData = oldV;
			this.changeCount++;
		}
	},

	methods: {
		isValid() {
			try {
				if (this.data?.length)
				{ 
					var obj = JSON.parse(this.data);
					obj.forEach(element => {
						if (!element.ip || !element.name || !element.plans || element?.emissionData.size == undefined)
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
			if (this.pasteCount <= 0)
				return;

			try
			{
				this.data = await navigator.clipboard.readText();

				return await this.toast(this.lang().prompts.textPasted);
			}
			catch (err)
			{
				return await this.toast(this.lang().prompts.unsupportedOperation, "danger");
			}
		},

		async copy() {
			try
			{
				this.$refs.copyBuffer.value = localStorage.getItem("appData");
				this.$refs.copyBuffer.select();
				document.execCommand("copy");
			}
			catch (err)
			{
				try 
				{
					await navigator.clipboard.writeText(this.$refs.copyBuffer.value);
				}
				catch (err2) 
				{
					return await this.toast(this.lang().prompts.unsupportedOperation, "danger");
				}
			}
			return await this.toast(this.lang().prompts.textCopied);
		},

		// back() {
		// 	this.data = this.oldData;
		// },

		async saveModal() {
			const data = this.isValid();

			const networkData = {
				networkName: this.networkName,
				networkPassword: this.networkPassword
			};

			if (this.changeCount > 0 && !data)
				return await this.toast(this.lang().prompts.invalidData, "danger");

			localStorage.setItem("networkData", JSON.stringify(networkData));
			return this.modalController.dismiss({
				data: this.data?.length ? data : undefined,
				networkData: networkData,
				refreshRequired: this.setLang(this.lng)
			});
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

.radio {
	--padding-start: 6px !important;
}

.copyBuffer {
	position: absolute;
	transform: scale(0%);
}

.data {
	textarea {
		width: 70%;
		height: 30px;
		border: 2px solid gray;
		padding: 5px;
		transition: 0.2s;
		overflow: hidden;
		margin-right: 4px;
		border: 1px solid gray;
		border-radius: 8px;
		resize: none;
		outline: none;
		transition: 0.4s;

		&.none {
			width: 0px !important;
			position: absolute;
			opacity: 0;
		}

		&:focus {
			box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.6);
		}

		&.invalid {
			background: rgba(255, 0, 0, 0.22);
		}
	}	

	ion-button {
		flex: 1;
		height: 30px;
	}
}

ion-select {
	margin-top: 4px;
	--padding-start: 0px !important;
	--padding-bottom: 8px !important;
	border-bottom: 1px lightgray solid;
	transition: 0.1s;

	&:active {
		background: var(--ion-color-light);
	}
}
</style>