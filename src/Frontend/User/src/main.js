import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import LoadScript from 'vue-plugin-load-script';
import VueAppleLogin from 'vue-apple-login';
import '@/assets/css/reset.scss';
import '@/assets/css/style.scss';
import '@/assets/css/swiper-bundle.min.css';
import '@/assets/css/slimselect.css';
//  import 'swiper/css';
import seon from './seon';
import money from 'v-money3';
import withUUID from 'vue-uuid';

const app = createApp(App).use(router);
const time = Date.now();

app.use(withUUID);
app.use(money);
app.use(seon);
app.use(store);
app.use(LoadScript);
app.use(VueAppleLogin, {
    clientId: 'Yourpick-login',
    scope: 'name email',
    redirectURI: 'https://yourpick.co.kr:3000/user/login/apple',
    state: time.toString(),
    usePopup: false,
});

app.mount('#app');
