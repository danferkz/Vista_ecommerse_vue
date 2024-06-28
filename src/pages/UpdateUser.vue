<template>
  <div>
    <h2>Update User</h2>
    <div>
      <form @submit.prevent="updateUser" class="form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            class="input"
            required
            v-model="user.name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            class="input"
            required
            v-model="user.email"
          />
        </div>

        <div class="form-group">
          <label for="profile_image">Profile Image</label>
          <div class="image-preview">
            <img :src="user.profile_image" :key="user.profile_image" />
          </div>
          <input
            type="file"
            id="profile_image"
            class="file-input"
            @change="handleImageChange"
          />
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            class="input"
            required
            v-model="user.address"
          />
        </div>

        <button class="btn" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateUser",
  data() {
    return {
      id: 0,
      newImage: null,
      user: {
        id: 0,
        name: "",
        email: "",
        profile_image: null,
        address: "",
      },
    };
  },
  methods: {
    imageUrlToObjectFile(imageUrl) {
      return new Promise((resolve, reject) => {
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            resolve(file);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${this.$route.params.id}/`
        );
        const data = await response.json();
        if (response.ok) {
          this.user = data;
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      this.newImage = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.profile_image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.user.profile_image = null;
      }
    },
    async updateUser() {
      const formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      if (this.newImage) {
        formData.append("profile_image", this.newImage);
      } else {
        const file = await this.imageUrlToObjectFile(this.user.profile_image);
        formData.append("profile_image", file);
      }
      formData.append("address", this.user.address);

      fetch(`http://localhost:8000/api/users/${this.user.id}/`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            this.user = {
              id: 0,
              name: "",
              email: "",
              profile_image: null,
              address: "",
            };
            this.newImage = null;
            this.$router.push("/");
          } else {
            throw new Error("Failed to update user");
          }
        })
        .catch((error) => console.error("Error updating user:", error));
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style >

</style>