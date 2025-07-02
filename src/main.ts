import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Button from 'primevue/button'
import Material from '@primeuix/themes/material';
import './style.css'
import App from './App.vue'

const app = createApp(App) // ← this is your Vue app instance

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Material
    }
 });
app.component('Button', Button)

app.mount('#app')