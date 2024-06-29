<template>
    <div class="home p-4">
        <!-- Sección de productos más recientes -->
        <div class="latest-products mb-8">
            <h2 class="text-2xl font-bold text-center mb-4">Productos Recientes</h2>
            <div v-if="latestProducts.length" class="flex flex-wrap">
                <ProductBox 
                    v-for="product in latestProducts"
                    :key="product.id"
                    :product="product"
                    class="card w-96 bg-base-100 shadow-xl p-4" 
                />
            </div>
            <p v-else class="w-full text-center text-gray-500">No hay productos disponibles.</p>
        </div>

        <!-- Sección de categorías -->
        <div class="categories mb-8">
            <h2 class="text-2xl font-bold text-center mb-4">Categorias</h2>
            <div class="flex flex-wrap -mx-4">
        <div v-for="category in categories" :key="category.slug" class="w-full md:w-1/4 p-4">
            <router-link 
                :to="`/${category.slug}/`" 
                class="btn glass rounded-full"
            >
                <h3 class="text-xl font-semibold">{{ category.name }}</h3>
            </router-link>
        </div>
    </div>
</div>

    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductBox from '../components/ProductBox.vue';

export default {
    name: 'Home',
    components: {
        ProductBox
    },
    setup() {
        const store = useStore();
        const latestProducts = computed(() => store.state.latestProducts);
        const categories = computed(() => store.state.categories);

        onMounted(() => {
            store.dispatch('fetchLatestProducts');
            store.dispatch('fetchCategories');
        });

        return {
            latestProducts,
            categories
        };
    }
}
</script>

<style scoped>
.latest-products, .categories {
    margin-bottom: 2rem;
}
</style>
