import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import "./registerServiceWorker";

/* Ionic bullshit for css */
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import "./theme/variables.css";
import "./theme/styles.scss";

import * as IonComponents from "@ionic/vue"; //Ionic components

import "swiper/swiper-bundle.min.css" //swiper css
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import SwiperCore, { Pagination, Scrollbar } from "swiper"; //import swiper core and plugins
SwiperCore.use([Pagination, Scrollbar]); //declare two plugins

import "@vaadin/vaadin";

import GlobalMixins from "./globals.js";

//Axios defaults
import https from "https";
import Axios from "axios";
Axios.defaults.timeout = 3000;
Axios.defaults.httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});
// Axios.defaults.headers.common["sec-fetch-dest"] = "empty"; // NOPE not working!
// Axios.defaults.headers.common["sec-fetch-mode"] = "no-cors"; // None of this
// Axios.defaults.headers.common["sec-fetch-site"] = "cross-site";
// Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; 
// Axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const app = createApp(App).use(IonicVue).use(router).mixin(GlobalMixins);

router.isReady().then(() => {
	//var secured = "s";
	//app.config.globalProperties.beIp = decodeURIComponent("http" + secured + "%3A%2F%2F178.143.44.187%3A1089%2F");
	app.mount("#app");
});

Object.keys(IonComponents).forEach(key => {
	if (/^Ion[A-Z].+$/.test(key)) {
		app.component(key, IonComponents[key]);
	}
});

app.component("swiper", Swiper);
app.component("swiper-slide", SwiperSlide);
