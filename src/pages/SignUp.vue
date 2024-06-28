<template>
    <div class="page-sign-up min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 class="text-2xl font-bold text-center mb-6">Sign up</h1>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" id="username" v-model="username" placeholder="Enter your username"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter your password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div class="mb-4">
                    <label for="password2" class="block text-sm font-medium text-gray-700">Repeat password</label>
                    <input type="password" id="password2" v-model="password2" placeholder="Repeat your password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div v-if="errors.length" class="mb-4">
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Oops!</strong>
                        <span class="block">{{ errors.join(', ') }}</span>
                    </div>
                </div>

                <div class="mb-6">
                    <button type="submit"
                        class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign up
                    </button>
                </div>

                <hr>

                <p class="text-center">
                    Or <router-link to="/log-in" class="text-indigo-500 hover:text-indigo-700">click here</router-link>
                    to log in!
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = [];

            if (this.username === '') {
                this.errors.push('The username is missing');
            }

            if (this.password.length < 6) {
                this.errors.push('The password is too short (min 6 characters)');
            }

            if (this.password !== this.password2) {
                this.errors.push('The passwords do not match');
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                };

                axios
                    .post("http://localhost:8000/api/v1/users/", formData)  // Adjust the endpoint as per your Djoser configuration
                    .then(response => {
                        alert('Account created successfully! Please log in.');
                        this.$router.push('/log-in');
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`);
                            }
                        } else {
                            this.errors.push('Something went wrong. Please try again.');
                            console.error(error);
                        }
                    });
            }
        }
    }
}
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>
