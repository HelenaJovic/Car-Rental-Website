<template>
  <div>
    <navBar></navBar>
    <div class="register-form">
      <h2>Your profile</h2>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" />
        </div>
        <div class="form-group">
          <label for="surname">Surname</label>
          <input type="text" id="surname" v-model="form.surname" />
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="form.gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="birthday">Birthday</label>
          <input type="date" id="birthday" v-model="form.birthday" />
        </div>
        <div class="form-group">
          <button type="button" v-on:click="submitForm()">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar.vue";

export default {
  components: {
    navBar: Navbar
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: ""
      }
    };
  },

  methods: {
    submitForm() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .put(`http://localhost:8081/users/${decoded.id}`, this.form)
        .then(response => {
          window.alert("User updated successfully");
          this.$router.push("/");
        })
        .catch(error => {
          console.log(this.form);
          console.error(error);
          window.alert("An error occurred while updating the user");
        });
    },
    getUserData() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .get(`http://localhost:8081/users/${decoded.id}`)
        .then(response => {
          this.form = response.data;
        })
        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching user data");
        });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.register-form h2 {
  text-align: center;
}

.register-form .form-group {
  margin-bottom: 20px;
}

.register-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.register-form input[type="text"],
.register-form input[type="password"],
.register-form select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.register-form button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  border: none;
}

.register-form button:hover {
  background-color: #45a049;
  cursor: pointer;
}
</style>
