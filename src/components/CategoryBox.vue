<template>
    <div class="w-full md:w-1/4 p-4">
        <div class="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
            <router-link :to="category.get_absolute_url" class="block text-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                View Products
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryBox',
    props: {
        category: Object
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
