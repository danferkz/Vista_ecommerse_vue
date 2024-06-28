<template>
    <div class="w-full md:w-1/4 p-4">
        <div class="bg-white p-4 shadow-md rounded-lg">
            <figure class="mb-4">
                <img :src="product.get_thumbnail" class="rounded-lg">
            </figure>

            <h3 class="text-xl font-bold">{{ product.name }}</h3>
            <p class="text-gray-600">${{ product.price }}</p>

            <router-link :to="product.get_absolute_url" class="inline-block bg-gray-800 text-white py-2 px-4 rounded mt-4">View details</router-link>
        </div>
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

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
