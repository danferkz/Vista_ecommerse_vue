<template>
    <div class="page-product">
        <div class="container mx-auto py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="flex justify-center">
                    <img :src="product.get_image" alt="Product Image" class="w-full md:max-w-lg">
                </div>

                <div>
                    <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>

                    <p class="text-lg mb-4">{{ product.description }}</p>

                    <div class="text-xl font-bold mb-4">${{ product.price }}</div>

                    <div class="flex items-center mb-4">
                        <label for="quantity" class="mr-2">Quantity:</label>
                        <input type="number" id="quantity" min="1" v-model.number="quantity"
                               class="w-16 py-1 px-2 border border-gray-300 rounded">
                    </div>

                    <button @click="addToCart()"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1
        };
    },
    mounted() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true);

            const categorySlug = this.$route.params.category_slug;
            const productSlug = this.$route.params.product_slug;

            try {
                const response = await axios.get(`/api/v1/products/${categorySlug}/${productSlug}`);
                this.product = response.data;
                document.title = `${this.product.name} | Djackets`;
            } catch (error) {
                console.log(error);
            }

            this.$store.commit('setIsLoading', false);
        },
        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1;
            }

            const item = {
                product: this.product,
                quantity: this.quantity
            };

            this.$store.commit('addToCart', item);

            this.showToast('The product was added to the cart', 'success');
        },
        showToast(message, type) {
            // Implement your own toast notification logic here
        }
    }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para este componente si es necesario */
</style>
