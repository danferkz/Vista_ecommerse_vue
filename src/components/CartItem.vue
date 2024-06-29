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
        initialItem: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const item = reactive({ ...props.initialItem });

        const getItemTotal = computed(() => {
            return item.quantity * parseFloat(item.product.price);
        });

        const decrementQuantity = () => {
            try {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                } else {
                    removeFromCart();
                }
            } catch (error) {
                console.error('Error decrementing quantity:', error);
            }
        };

        const incrementQuantity = () => {
            try {
                if (item.quantity < item.product.quantity) {
                    item.quantity += 1;
                    updateCart();
                }
            } catch (error) {
                console.error('Error incrementing quantity:', error);
            }
        };

        const updateCart = () => {
            try {
                store.commit('updateCartItem', item);
                localStorage.setItem('cart', JSON.stringify(store.state.cart));
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        };

        const removeFromCart = () => {
            try {
                if (item.product && item.product.id) {
                    store.commit('removeCartItem', item.product.id);
                    emit('removeFromCart', item.product.id);
                    localStorage.setItem('cart', JSON.stringify(store.state.cart));
                } else {
                    throw new Error('Invalid item or product ID');
                }
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
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
