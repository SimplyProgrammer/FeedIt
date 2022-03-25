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
// Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

const app = createApp(App).use(IonicVue).use(router);

app.mixin({
	data() {
		// Global utility
		return {
			//Utlity pre icony, nemusim zvlast importovat jak blb kazdu ikonu proste napisem napr :icon="icons.add"
			icons: new Proxy(Object.keys(AllIcons).reduce((map, elem) => {
				map[elem.toLowerCase()] = AllIcons[elem];
				return map;
			}, {}), {
				get: function(target, name) {
					var icon = target[name = name.toString().toLowerCase().replace("-", "")];
					if (icon)
						return icon;

					for(var key in target)
					{
						if (key.indexOf(name) > -1)
							return target[key];
					}
				}
			}),

			modalController: modalController,
			toastController: toastController
		}
	},
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
