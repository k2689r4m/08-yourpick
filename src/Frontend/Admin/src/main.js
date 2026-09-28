import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'; // [bootstrap]
import 'bootstrap'; // [bootstrap]
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
// import { createNaverMap } from 'vue3-naver-maps';
import LoadScript from 'vue-plugin-load-script';
import '@/assets/css/reset.scss';
import '@/assets/css/common.scss';
// import axios from 'axios';
import seon from './seon';
import money from 'v-money3';

const app = createApp(App);

// egpy3fy0c0
// salgni0xx3
// app.config.globalProperties.$axios = axios;
// app.use(createNaverMap, {
// 	clientId: process.env.VUE_APP_NAVER_API_ID, // Required
// 	category: 'ncp', // Optional
// 	// subModules: ['geocoder', 'panorama'], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
// });

app.config.globalProperties.$filters = {
	money(value) {
		if (value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return 0;
		}
	},
};

// console.log(seon);
app.use(money);
app.use(seon);
app.use(store);
app.use(router);
app.use(LoadScript);
app.use(BootstrapIconsPlugin);
app.mount('#app');
