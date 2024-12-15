import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './store/store'

const app = createApp(App)
app.provide('store', store);
app.mount('#app')
