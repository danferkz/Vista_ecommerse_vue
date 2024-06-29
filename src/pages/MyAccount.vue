<template>
    <div class="page-my-account">
        <div class="my-account-header flex justify-between items-center">
            <h1 class="text-3xl font-bold">My account</h1>
            <button @click="logout" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">Log out</button>
        </div>
        <hr class="my-4">

        <div class="my-orders">
            <h2 class="text-xl font-bold mb-4">My orders</h2>
            <OrderSummary
                v-for="order in orders"
                :key="order.id"
                :order="order"
                class="mb-4"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OrderSummary from '../components/OrderSummary.vue'; // Importa el componente OrderSummary

export default {
    name: 'MyAccount',
    components: {
        OrderSummary, // Registra el componente OrderSummary aquí
    },
    data() {
        return {
            orders: []
        };
    },
    mounted() {
        document.title = 'My account | Ferreteria Mayorazgo';
        this.getMyOrders();
    },
    methods: {
        logout() {
            axios.defaults.headers.common['Authorization'] = '';

            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('userid');

            this.$store.commit('removeToken');

            this.$router.push('/');
        },
        async getMyOrders() {
            this.$store.commit('setIsLoading', true);

            try {
                const response = await axios.get('/api/v1/orders/');
                this.orders = response.data;
            } catch (error) {
                console.log(error);
            }

            this.$store.commit('setIsLoading', false);
        }
    }
};
</script>

<style>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
