import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

createApp(App).use(store).use(router).use(axios).mount('#app')
