<template>
    <div class="page-cart p-4">
        <div class="flex flex-wrap">
            <div class="w-full mb-4">
                <h1 class="text-2xl font-bold">Cart</h1>
            </div>

            <div class="w-full bg-white p-4 shadow-md rounded-lg mb-4">
                <table class="min-w-full" v-if="cartTotalLength">
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

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="w-full bg-white p-4 shadow-md rounded-lg">
                <h2 class="text-xl font-semibold mb-2">Summary</h2>

                <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

                <hr class="my-4">

                <router-link to="/cart/checkout" class="inline-block bg-gray-800 text-white py-2 px-4 rounded">Proceed to checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CartItem from '../components/CartItem.vue';

export default {
    name: 'Cart',
    components: {
        CartItem,
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart;
        this.fetchCartItems();
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id);
        },
        fetchCartItems() {
            axios.get('/api/cart')
                .then(response => {
                    this.cart.items = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc + curVal.quantity;
            }, 0);
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc + curVal.product.price * curVal.quantity;
            }, 0);
        },
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
