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

import { Swiper, SwiperSlide } from 'swiper/vue'; //Swiper component
import '@vaadin/vaadin';

const app = createApp(App).use(IonicVue).use(router);

app.mixin({
  data() {
    return {
      icons: AllIcons,
    };
  },
  methods: {
    iicon(name) {
      return this.icons[name].ios;
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
