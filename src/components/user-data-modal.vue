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
		<textarea class="width-100" v-model.trim="data" :class="{invalid : !isValid()}"></textarea>
		<div class="d-flex">
			<ion-button color="light" class="small" @click="back()">
				<ion-icon :icon="icons.arrow"></ion-icon>
			</ion-button>
			<ion-button color="light" @click="paste()">{{lang().paste}}</ion-button>
			<ion-button color="light" @click="copy()">{{lang().copy}}</ion-button>
		</div>

		<h4 class="mt-5">{{lang().language + ":"}}</h4>
		<ion-select v-model="lng" :ok-text="lang().confirm" :cancel-text="lang().cancel">
			<ion-select-option v-for="lang in Object.keys(langs)" :value="lang" :key="lang">{{langs[lang].langName + " - " + lang.toUpperCase()}}</ion-select-option>
		</ion-select>

		<div class="buttons-wrapper">
			<ion-button color="secondary" @click="$refs.modal.closeModal()" ref="cancel">{{lang().cancel}}</ion-button>
			<ion-button color="tertiary" @click="saveModal()" ref="save">
				<ion-icon v-if="confirm" :icon="icons.checkmarkSharp"></ion-icon>
				<div v-else>{{lang().confirm}}</div> 
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
			confirm: 0,
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
			this.oldData = oldV;
			this.changeCount++;
			this.confirm = 0;
		},

		lng: function() {
			this.setLang(this.lng);
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
				navigator.clipboard.writeText(this.data);

				return await this.toast(this.lang().prompts.textCopied);
			}
			catch (err)
			{
				return await this.toast(this.lang().prompts.unsupportedOperation, "danger");
			}
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

			return await this.toast(this.lang().prompts.invalidData, "danger");
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