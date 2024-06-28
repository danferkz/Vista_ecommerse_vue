<template>
    <div class="page-log-in">
        <div class="flex items-center justify-center h-screen">
            <div class="w-full max-w-md">
                <h1 class="text-3xl font-bold mb-4 text-center">Log in</h1>

                <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="username" v-model="username" class="input" placeholder="Enter your username">
                    </div>

                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" v-model="password" class="input" placeholder="Enter your password">
                    </div>

                    <div v-if="errors.length" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>

                    <div class="flex items-center justify-between">
                        <button type="submit" class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                            Log in
                        </button>

                        <router-link to="/sign-up" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Or click here to sign up
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        };
    },
    mounted() {
        document.title = 'Log In | Djackets';
    },
    methods: {
        async submitForm() {
            this.errors = [];

            const formData = {
                username: this.username,
                password: this.password
            };

            try {
                const response = await axios.post("http://localhost:8000/api/v1/token/login/", formData); // Adjust the endpoint as per your Djoser configuration
                const token = response.data.auth_token;

                // Store the token in local storage or Vuex store as per your application's architecture
                localStorage.setItem("token", token);

                // Optionally, set Axios default authorization header
                axios.defaults.headers.common["Authorization"] = "Token " + token;

                // Redirect to a specific route after successful login
                this.$router.push('/cart'); // Adjust the redirect path as needed
            } catch (error) {
                if (error.response) {
                    for (const property in error.response.data) {
                        this.errors.push(`${property}: ${error.response.data[property]}`);
                    }
                } else {
                    this.errors.push('Something went wrong. Please try again');

                    console.error(JSON.stringify(error));
                }
            }
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>
