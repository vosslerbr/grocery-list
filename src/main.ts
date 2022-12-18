/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Message from 'primevue/message';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';
import Socketio from './plugins/socket';

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

app.use(Socketio, {
  connection: 'https://79ad-97-88-53-102.ngrok.io',
  options: { path: '/list-socket' },
});

app.component('Message', Message);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Tag', Tag);

app.mount('#app');
