<template>
  <div>
    <p>View Users</p>
    <div class="flex flex-wrap justify-center">
      <!-- Cards -->
      <div v-for="user in users" :key="user.id" class="w-full md:w-1/2 xl:w-1/3 p-6">
        <div class="bg-gray-50 rounded shadow-md p-4">
          <div class="flex justify-center mb-4">
            <img :src="user.profile_image" class="w-64 h-64 object-cover border-2 border-gray-200 rounded" />
          </div>
          <h5 class="text-lg font-bold mb-2">{{ user.name }}</h5>
          <p class="text-gray-600 mb-4">{{ user.email }}</p>
          <p class="text-gray-600 mb-4">{{ user.address }}</p>
          <div class="flex justify-end gap-5">
            <button class="btn-circle w-fit" @click="updateUser(user.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              @click="deleteUser(user.id)"
              class="btn-circle w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- End of Cards -->
    </div>
  </div>
</template>
  
  <script>
  import { data } from "autoprefixer";
  
  export default {
    name: "ViewUser",
    data() {
      return {
        users: [],
      };
    },
    methods: {
      fetchUsers() {
        fetch("http://localhost:8000/api/users/")
          .then((res) => res.json())
          .then((data) => (this.users = data))
          .catch((error) => console.error("Error fetching users:", error));
      },
      updateUser(id) {
        this.$router.push(`/update/${id}`)
      },
      deleteUser(id) {
        fetch(`http://localhost:8000/api/users/${id}`, {
          method: "DELETE",
        }).then((data) => {
          console.log(data);
          this.fetchUsers();
        });
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>