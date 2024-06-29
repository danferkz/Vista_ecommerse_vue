<template>
     <div class="page-log-in">
        <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content flex-col lg:flex-row-reverse mb-40">
                <div class="text-center lg:text-left ml-10">
                    <h1 class="text-5xl font-bold">Login now! 🐧 🧰</h1>
                    <p class="py-6">
                        Entra a tu cuenta y obten beneficios y ofertas exclusivas 
                    </p>
                </div>
                <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form @submit.prevent="submitForm" class="card-body">
                        <div class="form-control">
                            <label class="label">
                            <span class="label-text">Username</span>
                            </label>
                            <input type="text" id="username" v-model="username" placeholder="Enter your username" class="input" required />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" id="password" v-model="password" class="input" placeholder="Enter your password" />
                            <label class="label">
                                <a href="/sign-up" class="label-text-alt link link-hover">No esta registado? ⏰</a>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
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
        document.title = 'Log In | Ferreteria Mayorazgo';
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
                this.$router.push('/'); // Adjust the redirect path as needed
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
