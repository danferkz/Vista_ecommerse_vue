<template>
    <div class="page-success min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white shadow-md rounded px-8 py-12 max-w-md w-full text-center">
            <h1 class="text-3xl font-bold mb-4">Thank you</h1>
            <p class="text-lg text-gray-700">Your order will be processed within 48 hours</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = 'Success | Ferreteria Mayorazgo';
    },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para este componente si es necesario */
</style>
