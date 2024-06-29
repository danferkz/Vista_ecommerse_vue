<template>
    <div class="page-category p-4">
        <div class="flex flex-wrap">
            <div class="w-full mb-4">
                <h2 class="text-2xl font-bold text-center">{{ categoryName }}</h2>
            </div>

            <!-- Muestra los productos directamente -->
            <div v-if="categoryProducts.length" class="w-full flex flex-wrap">
                <ProductBox 
                    v-for="product in categoryProducts"
                    :key="product.id"
                    :product="product" />
            </div>
            <p v-else class="w-full text-center text-gray-500">No products available in this category.</p>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ProductBox from '../components/ProductBox.vue';

export default {
    name: 'Category',
    components: {
        ProductBox
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const categoryProducts = computed(() => store.state.categoryProducts);
        const categoryName = computed(() => route.params.category_slug.charAt(0).toUpperCase() + route.params.category_slug.slice(1));

        onMounted(() => {
            const categorySlug = route.params.category_slug;
            store.dispatch('fetchCategoryProducts', categorySlug);
        });

        watch(() => route.params.category_slug, (newSlug) => {
            store.dispatch('fetchCategoryProducts', newSlug);
        });

        return {
            categoryProducts,
            categoryName
        };
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
