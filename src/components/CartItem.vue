<template>
    <tr>
        <td>
            <router-link :to="item.product.get_absolute_url" class="text-blue-500 hover:underline">
                {{ item.product.name }}
            </router-link>
        </td>
        <td>${{ parseFloat(item.product.price).toFixed(2) }}</td>
        <td>
            {{ item.quantity }} / {{ item.product.quantity }}
            <button @click="decrementQuantity" class="text-red-500 mx-2">-</button>
            <button @click="incrementQuantity" class="text-green-500 mx-2">+</button>
        </td>
        <td>${{ getItemTotal.toFixed(2) }}</td>
        <td>
            <button class="text-red-500" @click="removeFromCart">
                &#x2716;
            </button>
        </td>
    </tr>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    setup(props, { emit }) {
        const store = useStore();
        const item = reactive({ ...props.initialItem });

        const getItemTotal = computed(() => {
            return item.quantity * parseFloat(item.product.price);
        });

        const decrementQuantity = () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCart();
            } else {
                removeFromCart();
            }
        };

        const incrementQuantity = () => {
            if (item.quantity < item.product.quantity) {
                item.quantity += 1;
                updateCart();
            }
        };

        const updateCart = () => {
            store.commit('updateCartItem', item);
            localStorage.setItem('cart', JSON.stringify(store.state.cart));
        };

        const removeFromCart = () => {
            store.commit('removeCartItem', item);
            emit('removeFromCart', item);
            localStorage.setItem('cart', JSON.stringify(store.state.cart));
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
