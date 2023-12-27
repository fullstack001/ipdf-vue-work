<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input v-model="username" type="text" id="username" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "pdfden",
      password: "akHsh2o2#",
      confirmUsername: "pdfden",
      confirmPass: "akHsh2o2#",
    };
  },
  methods: {
    login() {
      // Implement your login logic here
      if (
        this.username == this.confirmUsername &&
        this.password == this.confirmPass
      ) {
        this.$router.push("/allfeatures");
      } else {
        alert("You are not manager or dev!!");
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
