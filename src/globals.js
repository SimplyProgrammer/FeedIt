import * as AllIcons from "ionicons/icons"; //Ion icons bs
import { modalController, toastController } from "@ionic/vue"; //modalController, toastController...
import Axios from "axios";

import langs from "@/assets/lang/langs.json";

// Global utility
export default {
	methods: {
		async modal(modalComponent, componentProps = {}) {
			if (await this.modalController.getTop())
				return {
					onDidDismiss: () => {
						return {};
					}
				};

			const modal = await this.modalController.create({
				component: modalComponent,
				breakpoints: [0, 1],
				initialBreakpoint: 1,
				componentProps: componentProps
			});
			modal.present();

			return modal;
		},

		async toast(message, color = "success", duration = 2500) {
			const toast = await this.toastController.create({
				color: color,
				message: message,
				duration: duration,
			});
			toast.present();
			toast.onclick = () => toast.dismiss();

			return toast;
		},

		isIpValid(str) {
			if (str)
				return /^(https?:\/\/)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\:[0-9]?[0-9]?[0-9]?[0-9]?)?$/.test(str);
			return false;
		},

		setLang(lang) {
			if (this.language == lang)
				return false;

			localStorage.setItem("lang", this.language = lang);
			return true;
		},

		lang(translationKey = null) {
			if (translationKey)
			{
				var transl = this.langs[this.language][translationKey = translationKey.toString()];
				if (transl)
					return transl;
					
				for (var key in this.langs[this.language])
				{
					if (key.indexOf(translationKey) > -1)
						return this.langs[this.language][key];
				}
			}
			return this.langs[this.language];
		},

		httpClient(url, options = {}) {
			options.mode = "no-cors";
			// options.headers = {
			// 	"Access-Control-Request-Private-Network": true
			// };

			if (localStorage.getItem("httpClientIndex") && localStorage.getItem("httpClientIndex") == 0)
				return fetch(url, options);
			return Axios.get(url, options);
		},

		setHttpClient(index) { // for debug
			localStorage.setItem("httpClientIndex", index);
			this.$router.go(0);
		}
	},

	data() {
		return {
			langs: langs,
			language: localStorage.getItem("lang") ?? "en",

			//Utlity pre icony, nemusim zvlast importovat jak blb kazdu ikonu proste napisem napr :icon="icons.add"
			icons: new Proxy(Object.keys(AllIcons).reduce((map, elem) => {
				map[elem.toLowerCase()] = AllIcons[elem];
				return map;
			}, {}), {
				get: function(target, name) {
					var icon = target[name = name.toString().toLowerCase().replace("-", "")];
					if (icon)
						return icon;

					for (var key in target)
					{
						if (key.indexOf(name) > -1)
							return target[key];
					}
				}
			}),

			modalController: modalController,
			toastController: toastController,
			http: "http"
		}
	}
}