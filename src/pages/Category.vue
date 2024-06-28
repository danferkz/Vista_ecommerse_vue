<template>
    <div class="page-category p-4">
        <div class="flex flex-wrap">
            <div class="w-full mb-4">
                <h2 class="text-2xl font-bold text-center">{{ category.name }}</h2>
            </div>

            <ProductBox 
                v-for="product in category.products"
                :key="product.id"
                :product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductBox from '../components/ProductBox.vue' // Ajusta la ruta según sea necesario

export default {
    name: 'Category',
    components: {
        ProductBox
    },
    setup() {
        const category = ref({ products: [] });
        const route = useRoute();

        const getCategory = async () => {
            const categorySlug = route.params.category_slug;

            try {
                const response = await axios.get(`/api/v1/products/${categorySlug}/`);
                category.value = response.data;
                document.title = category.value.name + ' | Djackets';
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            getCategory();
        });

        watch(route, (to, from) => {
            if (to.name === 'Category') {
                getCategory();
            }
        });

        return {
            category
        };
    }
}
</script>
