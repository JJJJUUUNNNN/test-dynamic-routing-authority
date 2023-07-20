import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia';
import '@/route/permission.js'

const pinia = createPinia();

const app=createApp(App)

app.use(pinia).use(router).mount('#app')

