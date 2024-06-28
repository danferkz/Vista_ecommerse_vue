import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'

import Home from '../pages/Home.vue'

import Product from '../pages/Product.vue'
import Category from '../pages/Category.vue'
import Search from '../pages/Search.vue'
import Cart from '../pages/Cart.vue'
import SignUp from '../pages/SignUp.vue'
import LogIn from '../pages/LogIn.vue'
import MyAccount from '../pages/MyAccount.vue'
import Checkout from '../pages/Checkout.vue'
import Success from '../pages/Success.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      meta: {
          requireLogin: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/cart/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/cart/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {
          requireLogin: true
      }
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'Product',
      component: Product
    },
    {
      path: '/:category_slug',
      name: 'Category',
      component: Category
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})