<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
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
            <label for="new_password">Confirm password</label>
            <input
              type="password"
              id="new_password"
              v-model="form.new_password"
            />
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
            <button type="submit" v-on:click.prevent="submitForm()">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
        new_password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        basket: null,
        role: "buyer",
        pastRentals: null,
        rentalObject: null,
        points: null,
        buyerType: null
      }
    };
  },
  methods: {
    submitForm() {
      if (this.form.password !== this.form.new_password) {
        this.$toastr.e("Passwords do not match!");
        return;
      }
      axios
        .post("http://localhost:8081/users", this.form)
        .then(response => {
          this.$toastr.s("Successfully registered!");
          this.$router.push("/");
        })
        .catch(err => {
          this.$toastr.e("This username already exists!");
        });
    }
  }
};
</script>

<style scoped>
.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
  padding: 60px;
}
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  background-color: #f5f5f5;
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
  background-color: black;
  color: #fff;
  border: none;
}

.register-form button:hover {
  background-color: #45a049;
  cursor: pointer;
}
</style>
