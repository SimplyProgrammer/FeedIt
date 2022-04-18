import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import './registerServiceWorker';

/* Ionic bullshit for css */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import './theme/variables.css'
import './theme/styles.scss'

import * as IonComponents from '@ionic/vue'; //Ionic components
import * as AllIcons from "ionicons/icons"; //Ion icons bs

import "swiper/swiper-bundle.min.css" //swiper css
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import SwiperCore, { Pagination, Scrollbar } from "swiper"; //import swiper core and plugins
SwiperCore.use([Pagination, Scrollbar]); //declare two plugins

import '@vaadin/vaadin';

import { modalController, toastController } from "@ionic/vue"; //modalController, toastController...

//Axios defaults
import https from 'https';
import Axios from 'axios';
Axios.defaults.timeout = 3000;
Axios.defaults.httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});
// Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // NOPE not working!
// Axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

import langs from '@/assets/lang/langs.json';

const app = createApp(App).use(IonicVue).use(router);

// Global utility
app.mixin({
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
				duration: duration
			});
			toast.present();
			return toast;
		},

		isIpValid(str) {
			if (str)
				return /^(https?:\/\/)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\:[0-9]?[0-9]?[0-9]?[0-9]?)?$/.test(str);
			return false;
		},

		setLang(lang) {
			if (this.language == lang)
				return;

			localStorage.setItem("lang", this.language = lang);
			this.$router.go(0);
		},

		lang() {
			return this.langs[this.language];
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
});

router.isReady().then(() => {
	//var secured = "s";
	//app.config.globalProperties.beIp = decodeURIComponent("http" + secured + "%3A%2F%2F178.143.44.187%3A1089%2F");
	app.mount('#app');
});

Object.keys(IonComponents).forEach(key => {
	if (/^Ion[A-Z].+$/.test(key)) {
		app.component(key, IonComponents[key]);
	}
});

app.component("swiper", Swiper);
app.component("swiper-slide", SwiperSlide);
