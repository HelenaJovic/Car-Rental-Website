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
import jwt_decode from "jwt-decode";

export default {
  components: {
    navBar: Navbar
  },
  data() {
    return {
      username: "",
      password: "",
      user:null
    };
  },

  methods: {
  LogIn() {
    console.log(this.username, this.password);
    axios
      .post("http://localhost:8081/users/login", {
        username: this.username,
        password: this.password
      })
      .then(response => {
          const data = response.data;
          const token = data.token;
          localStorage.setItem("token", token);
          const decoded = jwt_decode(token);

        axios
          .get(`http://localhost:8081/users/${decoded.id}`)
          .then(response => {
            const user = response.data;
            console.log(user)
            if (user.isBlocked) {
              this.$toastr.e("This user is blocked. Please contact the administrator.");
              return;
            }

            eventBus.$emit("rerenderNavbar");
            this.$router.push("/");
          })
          .catch(error => {
            console.error(error);
            window.alert("An error occurred while fetching user data");
          });
      })
      .catch(err => {
        console.log(err);
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
