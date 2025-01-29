import './styles/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'quill/dist/quill.snow.css';

import App from './App.vue';
import router from './router';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const queryClient = new QueryClient();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
