<template>
  <div id="wrapper">
    <nav class="navbar bg-base-300">
      <div class="navbar-brand m-2 pr-5">
        <router-link to="/" class="btn btn-ghost text-xl"><strong>Ferreteria Mayorazgo 🐧</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start m-2" style="padding-right: 60vw;">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input input-bordered w-24 md:w-auto" placeholder="Qué estás buscando?" name="query">
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="navbar-end flex-none">
          <ul class="menu menu-horizontal">
            <li class="menu menu-horizontal">
              <router-link v-if="!$store.state.isAuthenticated" to="/log-in" class="navbar-item mr-1.3">Log in</router-link>
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">My account</router-link>
              </template>
            </li>

            <div class="navbar-item mr-2.5 mt-1">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn">
                  <div class="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="badge badge-sm indicator-item">({{ cartTotalLength }})</span>
                  </div>
                </div>
                <div
                  tabindex="0"
                  class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                  <div class="card-body">
                    <span class="text-lg font-bold">({{ cartTotalLength }}) Items</span>
                    <span class="text-info">Subtotal: $999</span>
                    <div class="card-actions">
                      <router-link to="/cart" class="btn btn-primary btn-block">View cart</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <li>
              <details class="mt-2">
                <summary>Categorias</summary>
                <ul class="bg-base-100 rounded-t-none">
                  <li v-for="category in categories" :key="category.slug">
                    <router-link :to="`/${category.slug}/`" class="navbar-item">{{ category.name }}</router-link>
                  </li>
                </ul>
              </details>
            </li>
            <input
              type="checkbox"
              value="halloween"
              class="toggle ml-4 mt-3.5 theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
            />
          </ul>
        </div>
      </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2024</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMobileMenu: false,
      categories: []  // Agregamos la propiedad categories al estado del componente
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  computed: {
      cart() {
          return this.$store.state.cart;
      },
      cartTotalLength() {
          return this.cart.items.reduce((total, item) => total + item.quantity, 0);
      }
  },
  watch: {
    '$route.path': function(newPath) {
      // Recargar la página si navegamos a la ruta de inicio
      if (newPath === '/' && !this.isHomePageReloaded) {
        window.location.reload();
        this.isHomePageReloaded = true; // Asegura que se recargue solo una vez
      }
    },
    '$store.state.isAuthenticated': function(newValue) {
      // Recargar la página cuando cambia el estado de autenticación
      if (newValue !== this.wasAuthenticated) {
        this.$nextTick(() => {
          window.location.reload();
        });
        this.wasAuthenticated = newValue; // Guarda el estado de autenticación para evitar recargas repetidas
      }
    }
  },
  created() {
    this.isHomePageReloaded = false; // Inicializa el flag para la recarga de la página de inicio
    this.wasAuthenticated = this.$store.state.isAuthenticated; // Inicializa el estado de autenticación
    
    // Fetch de categorías desde el backend
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/api/v1/categories/'); // Asegúrate de que esta sea la URL correcta de tu API para obtener categorías
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Puedes agregar estilos específicos para la sección de categorías aquí */
</style>
