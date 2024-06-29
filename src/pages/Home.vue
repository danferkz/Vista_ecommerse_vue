<template>
    <div class="home">
        <section class="bg-gray-800 text-white py-8 mb-6">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-6">Welcome to Djackets</h1>
                <p class="text-xl">The best jacket store online</p>
            </div>
        </section>

        <div class="latest-products mb-12">
            <h2 class="text-3xl font-semibold text-center mb-6">Latest Products</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductBox
                    v-for="product in latestProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>

        <div class="latest-categories">
            <h2 class="text-3xl font-semibold text-center mb-6">Categories</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CategoryBox
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import ProductBox from '../components/ProductBox.vue';
import CategoryBox from '../components/CategoryBox.vue';

export default {
    name: 'Home',
    components: {
        ProductBox,
        CategoryBox,
    },
    setup() {
        const latestProducts = ref([]);
        const categories = ref([]);

        const getLatestProducts = async () => {
            try {
                const response = await axios.get('/api/v1/latest-products/');
                latestProducts.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        const getCategories = async () => {
            try {
                const response = await axios.get('/api/v1/categories/');
                categories.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            getLatestProducts();
            getCategories();
            document.title = 'Home | Djackets';
        });

        return {
            latestProducts,
            categories,
        };
    },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
