import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import '@/router/permission.js'

const pinia = createPinia();

const app=createApp(App)

app.use(pinia).use(router).mount('#app')

