<template>
    <div class="page-search">
        <div class="container mx-auto py-8">
            <div class="text-center">
                <h1 class="text-3xl font-bold mb-4">Search</h1>
                <h2 class="text-lg text-gray-600 mb-4">Search term: "{{ query }}"</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProductBox v-for="product in products" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '../components/ProductBox.vue'; // Ajusta la ruta según tu estructura de archivos

export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data() {
        return {
            products: [],
            query: ''
        };
    },
    mounted() {
        document.title = 'Search | Ferreteria Mayorazgo';

        const uri = window.location.search.substring(1);
        const params = new URLSearchParams(uri);

        if (params.get('query')) {
            this.query = params.get('query');
            this.performSearch();
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true);

            try {
                const response = await axios.post('/api/v1/products/search/', { query: this.query });
                this.products = response.data;
            } catch (error) {
                console.log(error);
            }

            this.$store.commit('setIsLoading', false);
        }
    }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para este componente si es necesario */
</style>
