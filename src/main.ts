import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'
import router from './router'

//Prime imports
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Material from '@primeuix/themes/material';

//Prime components
import Button from 'primevue/button'

const app = createApp(App) // ← this is your Vue app instance
app.use(router)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Material
    }
 });
app.component('Button', Button)

app.mount('#app')