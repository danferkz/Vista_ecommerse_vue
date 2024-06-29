<template>
    <div class="product-box">
        <figure class="mb-4">
            <img :src="`http://localhost:8000${product.get_thumbnail}`" :alt="product.name" class="w-full h-48 object-cover" />
        </figure>
        <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-lg font-semibold mb-2">${{ product.price }}</p>
        <router-link :to="product.get_absolute_url" class="block text-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            View Details
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>

<style>
/* Aquí puedes agregar estilos específicos para este componente si es necesario */
</style>
