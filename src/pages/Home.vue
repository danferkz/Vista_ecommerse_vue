<template>
    <div class="home">
        <section class="bg-gray-800 text-white py-8 mb-6">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-6">Welcome to Djackets</h1>
                <p class="text-xl">The best jacket store online</p>
            </div>
        </section>

        <div class="latest-products">
            <h2 class="text-3xl font-semibold text-center">Latest products</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductBox
                    v-for="product in latestProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import ProductBox from '../components/ProductBox.vue';

export default {
    name: 'Home',
    components: {
        ProductBox,
    },
    setup() {
        const latestProducts = ref([]);

        const getLatestProducts = async () => {
            try {
                const response = await axios.get('/api/v1/latest-products/');
                latestProducts.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            getLatestProducts();
            document.title = 'Home | Djackets';
        });

        return {
            latestProducts,
        };
    },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
