/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';

import App from './App.vue';
import router from './router';

import './assets/main.css';

import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(router);

app.component('Message', Message);
app.component('Card', Card);
app.component('Menubar', Menubar);

app.mount('#app');
