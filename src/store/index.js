import { createStore } from 'vuex'

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
            const cart = localStorage.getItem('cart')
            if (cart) {
                state.cart = JSON.parse(cart)
            } else {
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }

            const token = localStorage.getItem('token')
            if (token) {
                state.token = token
                state.isAuthenticated = true
            } else {
                state.token = ''
                state.isAuthenticated = false
            }
        },
        addToCart(state, item) {
            const exists = state.cart.items.find(i => i.product.id === item.product.id)
            if (exists) {
                exists.quantity += parseInt(item.quantity)
            } else {
                state.cart.items.push(item)
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        setIsLoading(state, status) {
            state.isLoading = status
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        },
        clearCart(state) {
            state.cart.items = []

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
    },
    actions: {
    },
    modules: {
    }
})