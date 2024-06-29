<template>
    <div class="page-cart p-4">
        <div class="flex flex-wrap">
            <div class="w-full mb-4">
                <h1 class="text-2xl font-bold">Cart</h1>
            </div>

            <div class="w-full bg-white p-4 shadow-md rounded-lg mb-4">
                <table class="min-w-full" v-if="cart.items.length">
                    <thead>
                        <tr>
                            <th class="py-2">Product</th>
                            <th class="py-2">Price</th>
                            <th class="py-2">Quantity</th>
                            <th class="py-2">Total</th>
                            <th class="py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            :key="item.product.id"
                            :initialItem="item"
                            @removeFromCart="removeFromCart"
                        />
                    </tbody>
                </table>

                <p v-else class="text-gray-500">You don't have any products in your cart...</p>
            </div>

            <div class="w-full bg-white p-4 shadow-md rounded-lg">
                <h2 class="text-xl font-semibold mb-2">Summary</h2>

                <strong>Total: ${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

                <hr class="my-4">

                <button
                    @click="proceedToCheckout"
                    class="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '../components/CartItem.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Cart',
    components: {
        CartItem,
    },
    computed: {
        ...mapState(['cart', 'isAuthenticated']),
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => acc + curVal.quantity, 0);
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => acc + curVal.product.price * curVal.quantity, 0);
        },
    },
    methods: {
        ...mapMutations(['removeCartItem']),
        proceedToCheckout() {
            if (this.isAuthenticated) {
                this.$router.push({ name: 'Checkout' });
            } else {
                this.$router.push({ name: 'LogIn', query: { to: '/checkout' } });
            }
        },
        removeFromCart(productId) {
            this.removeCartItem(productId);
        }
    },
    mounted() {
        // Cargar el carrito desde el localStorage al montar el componente
        const cartItems = localStorage.getItem('cart');
        if (cartItems) {
            this.$store.state.cart = JSON.parse(cartItems);
        }
    }
}
</script>

<style scoped>
/* Agrega estilos adicionales aquí si es necesario */
</style>
