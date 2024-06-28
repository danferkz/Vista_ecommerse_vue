<template>
    <div class="my-5">
      <h2 class="text-center">Add User</h2>
      <div class="">
        <form
          @submit.prevent="addUser"
          class="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="name"
            class="input input-bordered w-full max-w-lg"
            required
            v-model="user.name"
          />
  
          <input
            type="email"
            placeholder="email"
            class="input input-bordered w-full max-w-lg"
            required
            v-model="user.email"
          />
  
          <input
            type="file"
            class="file-input file-input-bordered w-full max-w-lg"
            @change="handleImageChange"
            required
          />
  
          <input
            type="text"
            placeholder="address"
            class="input input-bordered w-full max-w-lg"
            required
            v-model="user.address"
          />
          <button class="btn btn-primary max-w-lg w-full" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "AddUser",
    data() {
      return {
        user: {
          name: "",
          email: "",
          profile_image: null, // Corrected property name
          address: "",
        },
      };
    },
    methods: {
      addUser() {
        const formData = new FormData();
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("profile_image", this.user.profile_image); // Corrected property name
        formData.append("address", this.user.address);
        for (const pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        fetch("http://localhost:8000/api/users/", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to add user");
            }
            this.user = {
              name: "",
              email: "",
              profile_image: null, // Corrected property name
              address: "",
            };
            this.$router.push("/");
          })
          .catch((error) => console.error("Error adding user:", error));
      },
      handleImageChange(event) {
        this.user.profile_image = event.target.files[0];
      },
    },
  };
  </script>
  
  <style></style>