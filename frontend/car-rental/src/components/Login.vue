<template>
  <form class="login-form">
    <label for="username">Username</label>
    <input type="text" id="username" v-model="username" required />

    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" required />

    <button type="submit" v-on:click="LogIn()">Login</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    LogIn() {
      axios
        .post("http://localhost:8081/users/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          const data = response.data;
          const token = data.token;

          localStorage.setItem("token", token);
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
