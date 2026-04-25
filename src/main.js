import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router.js';
import { Indigo } from '@/themes/theme.js';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);
app.use(createPinia());
app.use(ToastService);
app.use(ConfirmationService);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Indigo,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.mount('#app');
