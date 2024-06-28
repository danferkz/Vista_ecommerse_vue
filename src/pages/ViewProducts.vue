<template>
    <div class="page-product bg-gray-100 min-h-screen py-8">
        <div class="container mx-auto">
            <div class="bg-white shadow-md rounded-lg overflow-hidden md:flex">
                <div class="md:w-1/2">
                    <img :src="product.get_image" alt="Product Image" class="w-full">
                </div>
                <div class="md:w-1/2 px-4 py-6">
                    <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
                    <p class="text-lg text-gray-700 mb-4">{{ product.description }}</p>
                    <div class="flex items-center justify-between">
                        <p class="text-xl font-bold">${{ product.price }}</p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'Product',
    setup() {
        const product = ref({});
        const route = useRoute();

        const getProduct = async () => {
            const category_slug = route.params.category_slug;
            const product_slug = route.params.product_slug;

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${category_slug}/${product_slug}`);
                product.value = response.data;
                document.title = product.value.name + ' | Djackets';
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        onMounted(() => {
            getProduct();
        });

        return {
            product,
        };
    },
};
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
.container {
    padding-left: 1rem;
    padding-right: 1rem;
}
.product-container {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
}
.product-image {
    border-radius: 0.5rem;
    overflow: hidden;
}
.product-details {
    padding: 1rem;
}
.product-info {
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0 0 0.5rem 0.5rem;
}
.product-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.product-description {
    font-size: 1rem;
    line-height: 1.5;
    color: #4a5568;
    margin-bottom: 1rem;
}
.product-subtitle {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
</style>
