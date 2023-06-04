<template>
  <div>
    <h1>Your profile</h1>
    <label>Username: </label>
    <label>{{ user.username }}</label>
    <label>Name: </label>
    <label>{{ user.name }}</label>
    <label>Surname: </label>
    <label>{{ user.surname }}</label>
    <label>Gender: </label>
    <label>{{ user.gender }}</label>
    <label>Birthday: </label>
    <label>{{ user.birthday }}</label>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      user: [
        {
          username: null,
          name: null,
          surname: null,
          gender: null,
          birthday: null
        }
      ],
      userId: null
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    const decoded = jwt_decode(token);

    this.userId = decoded.id;
    console.log(this.userId);

    axios.get(`http://localhost:8081/users/${this.userId}`).then(response => {
      console.log(response);
      this.user = response.data;
    });
  }
};
</script>
