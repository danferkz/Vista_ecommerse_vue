import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './style.css';  // Asegúrate de que los estilos de Tailwind CSS estén importados

// Configuración de Axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Crear instancia de Vue
const app = createApp(App);

// Añadir Axios a las propiedades globales
app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.mount('#app');
