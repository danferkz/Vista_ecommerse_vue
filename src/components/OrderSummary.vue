<template>
    <div class="p-4 bg-white shadow-md rounded-lg mb-4">
        <h3 class="text-2xl font-bold mb-6">Order #{{ order.id }}</h3>

        <h4 class="text-xl font-semibold">Products</h4>

        <table class="min-w-full bg-white">
            <thead>
                <tr>
                    <th class="py-2">Product</th>
                    <th class="py-2">Price</th>
                    <th class="py-2">Quantity</th>
                    <th class="py-2">Total</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="item in order.items"
                    :key="item.product.id"
                >
                    <td class="py-2">{{ item.product.name }}</td>
                    <td class="py-2">${{ item.product.price }}</td>
                    <td class="py-2">{{ item.quantity }}</td>
                    <td class="py-2">${{ getItemTotal(item).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    setup(props) {
        const getItemTotal = (item) => {
            return item.quantity * item.product.price;
        };

        const orderTotalLength = computed(() => {
            return props.order.items.reduce((acc, curVal) => {
                return acc + curVal.quantity;
            }, 0);
        });

        return {
            getItemTotal,
            orderTotalLength
        };
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
