<template>
  <div class="register-form">
    <h2>Create an Account</h2>
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
        <button type="submit" v-on:click="submitForm()">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        basket: null
      }
    };
  },
  methods: {
    submitForm() {
      axios.post("http://localhost:8081/users", this.form).then(response => {
        alert("User added successfully");
      });
    }
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
