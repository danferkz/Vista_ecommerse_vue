<template>
    <div class="page-checkout p-4">
        <div class="container mx-auto">
            <h1 class="text-2xl font-bold mb-4">Checkout</h1>

            <div v-if="!cart.items.length" class="text-center text-lg text-gray-500">
                Your cart is empty.
            </div>

            <div v-else>
                <form @submit.prevent="handleCheckout" class="space-y-4">
                    <div v-for="item in cart.items" :key="item.product.id" class="flex items-center mb-4 p-4 border rounded-lg">
                        <img :src="item.product.get_thumbnail" alt="Product Image" class="w-16 h-16 object-cover mr-4">
                        <div class="flex-1">
                            <h2 class="text-lg font-semibold">{{ item.product.name }}</h2>
                            <p class="text-gray-600">Price: ${{ item.product.price }}</p>
                            <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                        </div>
                    </div>

                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-xl font-bold">Total: ${{ totalAmount.toFixed(2) }}</span>
                        <button
                            type="submit"
                            class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
                        >
                            Pay with Niubiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'Checkout',
    computed: {
        ...mapState(['cart', 'isAuthenticated']),
        totalAmount() {
            return this.cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        }
    },
    methods: {
        ...mapMutations(['clearCart']),
        async handleCheckout() {
            if (this.isAuthenticated) {
                try {
                    // Llamar a la API para crear la orden y obtener el token de pago
                    const response = await axios.post('checkout/', {
                        items: this.cart.items,
                        first_name: this.$store.state.user.firstName,
                        last_name: this.$store.state.user.lastName,
                        email: this.$store.state.user.email,
                        address: this.$store.state.user.address,
                        zipcode: this.$store.state.user.zipcode,
                        place: this.$store.state.user.place,
                        phone: this.$store.state.user.phone,
                    });

                    const { data } = response;
                    // Redirigir al usuario al checkout de Niubiz
                    window.location.href = data.redirect_url;  // Suponiendo que obtienes una URL de redirección
                    this.clearCart();  // Vaciar el carrito después de un pago exitoso
                } catch (error) {
                    console.error('Error during checkout:', error);
                }
            } else {
                this.$router.push({ name: 'LogIn', query: { to: '/checkout' } });
            }
        }
    },
    mounted() {
        if (!this.isAuthenticated) {
            this.$router.push({ name: 'LogIn', query: { to: '/checkout' } });
        }
    }
}
</script>

<style scoped>
/* Agrega estilos adicionales aquí si es necesario */
</style>
