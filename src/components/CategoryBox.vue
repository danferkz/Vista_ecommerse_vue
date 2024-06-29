<template>
    <div class="page-category p-4">
        <div class="flex flex-wrap">
            <div class="w-full mb-4">
                <h2 class="text-2xl font-bold text-center">{{ categoryName }}</h2>
            </div>

            <!-- Muestra los productos directamente usando ProductBox -->
            <div v-if="products.length" class="w-full flex flex-wrap">
                <ProductBox 
                    v-for="product in products"
                    :key="product.id"
                    :product="product" />
            </div>
            <p v-else class="w-full text-center text-gray-500">No products available in this category.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductBox from '../components/ProductBox.vue'

export default {
    name: 'Category',
    components: {
        ProductBox
    },
    setup() {
        const products = ref([]);
        const categoryName = ref('');
        const route = useRoute();

        // Función para obtener productos de la categoría
        const getCategoryProducts = async () => {
            const categorySlug = route.params.category_slug;

            try {
                let url = `/api/v1/products/`;
                if (categorySlug !== '/') {
                    url += `${categorySlug}/`;
                    categoryName.value = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);  // Asigna el nombre de la categoría basado en el slug
                } else {
                    url += `latest/`;  // Para la ruta principal, obtenemos los productos más recientes
                    categoryName.value = 'Latest Products';
                }

                const response = await axios.get(url);
                products.value = response.data;  // Asigna los productos a la variable `products`
                document.title = `${categoryName.value} | Djackets`;
            } catch (error) {
                console.error('Error fetching category products:', error);
            }
        };

        // Llama a getCategoryProducts cuando el componente se monta
        onMounted(() => {
            getCategoryProducts();
        });

        // Re-obtiene los datos si cambia el slug de categoría
        watch(() => route.params.category_slug, () => {
            getCategoryProducts();
        });

        return {
            products,
            categoryName,
        };
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
