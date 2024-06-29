import { createStore } from 'vuex';

export default createStore({
    state: {
        cart: {
            items: [],
        },
        isAuthenticated: false,
        token: '',
        isLoading: false
    },
    mutations: {
        initializeStore(state) {
            // Carga el carrito desde el almacenamiento local
            if (localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart'));
            } else {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }

            // Carga el token desde el almacenamiento local
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token');
                state.isAuthenticated = true;
            } else {
                state.token = '';
                state.isAuthenticated = false;
            }
        },
        addToCart(state, item) {
            const exists = state.cart.items.find(i => i.product.id === item.product.id);
            if (exists) {
                const newQuantity = exists.quantity + item.quantity;
                if (newQuantity <= exists.product.quantity) {
                    exists.quantity = newQuantity;
                } else {
                    exists.quantity = exists.product.quantity;
                }
            } else {
                if (item.quantity <= item.product.quantity) {
                    state.cart.items.push(item);
                } else {
                    item.quantity = item.product.quantity;
                    state.cart.items.push(item);
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateCartItem(state, updatedItem) {
            const index = state.cart.items.findIndex(item => item.product.id === updatedItem.product.id);
            if (index !== -1) {
                const existingItem = state.cart.items[index];
                if (updatedItem.quantity <= existingItem.product.quantity) {
                    state.cart.items[index] = { ...updatedItem };
                } else {
                    state.cart.items[index] = { ...updatedItem, quantity: existingItem.product.quantity };
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCartItem(state, productId) {
            // Elimina el ítem del carrito usando productId
            state.cart.items = state.cart.items.filter(item => item.product.id !== productId);
            // Actualiza el almacenamiento local
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setToken(state, token) {
            state.token = token;
            state.isAuthenticated = true;
        },
        removeToken(state) {
            state.token = '';
            state.isAuthenticated = false;
        },
        clearCart(state) {
            state.cart = { items: [] };
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
    actions: {},
    modules: {},
});
