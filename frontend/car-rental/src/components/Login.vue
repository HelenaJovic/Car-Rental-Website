<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
      <form class="login-form">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit" v-on:click.prevent="LogIn()">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";
import Navbar from "./Navbar.vue";

export default {
  components: {
    navBar: Navbar
  },
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
          console.log(token);
          eventBus.$emit("rerenderNavbar");
          this.$router.push("/");
        })
        .catch(err => {
          this.$toastr.e("Wrong username or password!");
        });
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70vh;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 25px;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  height: 40px;
  width: 200px;
}

button {
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  height: 40px;
  width: 100px;
}
</style>
