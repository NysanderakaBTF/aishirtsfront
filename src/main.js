import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from "./store/index.js";
import Particles from "vue3-particles";
import Notifications from '@kyvg/vue3-notification'
const app = createApp(App)
app.use(router).use(store).use(Particles).use(Notifications)

app.mount('#app')
