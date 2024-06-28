<template>
    <div class="page-checkout">
        <h1 class="text-3xl font-bold mb-4">Checkout</h1>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in cart.items" :key="item.product.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.product.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${{ item.product.price }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.quantity }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${{ getItemTotal(item).toFixed(2) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="px-6 py-4 text-sm font-medium text-gray-900">Total</td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ cartTotalLength }}</td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">${{ cartTotalPrice.toFixed(2) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4">Shipping details</h2>
        <p class="text-gray-600 mb-2">* All fields are required</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">First name*</label>
                <input type="text" v-model="first_name" class="input" placeholder="Enter your first name">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Last name*</label>
                <input type="text" v-model="last_name" class="input" placeholder="Enter your last name">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">E-mail*</label>
                <input type="email" v-model="email" class="input" placeholder="Enter your email">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Phone*</label>
                <input type="text" v-model="phone" class="input" placeholder="Enter your phone number">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Address*</label>
                <input type="text" v-model="address" class="input" placeholder="Enter your address">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Zip code*</label>
                <input type="text" v-model="zipcode" class="input" placeholder="Enter your zip code">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Place*</label>
                <input type="text" v-model="place" class="input" placeholder="Enter your place">
            </div>
        </div>

        <div class="mt-4">
            <div v-if="errors.length" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <template v-for="error in errors">
                    <p>{{ error }}</p>
                </template>
            </div>
        </div>

        <hr class="my-8">

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength > 0">
            <hr class="my-8">
            <button @click="submitForm" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                Pay with Stripe
            </button>
        </template>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Checkout | Djackets';

        this.cart = this.$store.state.cart;

        if (this.cartTotalLength > 0) {
            this.stripe = Stripe('pk_test_51H1HiuKBJV2qfWbD2gQe6aqanfw6Eyul5PO2KeOuSRlUMuaV4TxEtaQyzr9DbLITSZweL7XjK3p74swcGYrE2qEX00Hz7GmhMI');
            const elements = this.stripe.elements();
            this.card = elements.create('card', { hidePostalCode: true });
            this.card.mount('#card-element');
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price;
        },
        submitForm() {
            this.errors = [];

            if (!this.first_name.trim()) {
                this.errors.push('The first name field is required.');
            }

            if (!this.last_name.trim()) {
                this.errors.push('The last name field is required.');
            }

            if (!this.email.trim()) {
                this.errors.push('The email field is required.');
            }

            if (!this.phone.trim()) {
                this.errors.push('The phone field is required.');
            }

            if (!this.address.trim()) {
                this.errors.push('The address field is required.');
            }

            if (!this.zipcode.trim()) {
                this.errors.push('The zip code field is required.');
            }

            if (!this.place.trim()) {
                this.errors.push('The place field is required.');
            }

            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true);

                this.stripe.createToken(this.card).then(result => {
                    if (result.error) {
                        this.$store.commit('setIsLoading', false);
                        this.errors.push('Something went wrong with Stripe. Please try again.');
                        console.log(result.error.message);
                    } else {
                        this.stripeTokenHandler(result.token);
                    }
                });
            }
        },
        async stripeTokenHandler(token) {
            const items = [];

            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i];
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                };

                items.push(obj);
            }

            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                address: this.address,
                zipcode: this.zipcode,
                place: this.place,
                phone: this.phone,
                items: items,
                stripe_token: token.id
            };

            try {
                await axios.post('/api/v1/checkout/', data);
                this.$store.commit('clearCart');
                this.$router.push('/cart/success');
            } catch (error) {
                this.errors.push('Something went wrong. Please try again.');
                console.log(error);
            }

            this.$store.commit('setIsLoading', false);
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => acc += curVal.product.price * curVal.quantity, 0);
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => acc += curVal.quantity, 0);
        }
    }
};
</script>

<style >

</style>
