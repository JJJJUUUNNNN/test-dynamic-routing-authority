import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import { notivue } from 'notivue';
import 'notivue/notifications.css';
import 'notivue/animations.css';

import App from './App.vue';
import router from './router';
import './router/permission';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(router).use(notivue).mount('#app');
