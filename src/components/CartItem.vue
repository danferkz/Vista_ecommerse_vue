<template>
    <tr>
        <td>
            <router-link :to="item.product.get_absolute_url" class="text-blue-500 hover:underline">
                {{ item.product.name }}
            </router-link>
        </td>
        <td>${{ item.product.price }}</td>
        <td>
            {{ item.quantity }}
            <button @click="decrementQuantity(item)" class="text-red-500 mx-2">-</button>
            <button @click="incrementQuantity(item)" class="text-green-500 mx-2">+</button>
        </td>
        <td>${{ getItemTotal(item).toFixed(2) }}</td>
        <td>
            <button class="text-red-500" @click="removeFromCart(item)">
                &#x2716;
            </button>
        </td>
    </tr>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    setup(props, { emit }) {
        const item = ref(props.initialItem);

        const getItemTotal = (item) => {
            return item.quantity * item.product.price;
        };

        const decrementQuantity = (item) => {
            item.quantity -= 1;

            if (item.quantity === 0) {
                emit('removeFromCart', item);
            }

            updateCart();
        };

        const incrementQuantity = (item) => {
            item.quantity += 1;
            updateCart();
        };

        const updateCart = () => {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
        };

        const removeFromCart = (item) => {
            emit('removeFromCart', item);
            updateCart();
        };

        return {
            item,
            getItemTotal,
            decrementQuantity,
            incrementQuantity,
            removeFromCart
        };
    }
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
