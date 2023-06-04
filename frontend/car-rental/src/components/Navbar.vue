<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/login" v-if="!isLoggedIn" class="nav-link"
          >Login</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/register" v-if="!isLoggedIn" class="nav-link"
          >Register</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/updateUser" v-if="isLoggedIn" class="nav-link"
          >Update</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          to="/"
          v-if="isLoggedIn"
          v-on:click.native="LogOut()"
          class="nav-link"
          >Log Out</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { eventBus } from "../main.js";
import { isLoggedIn } from "../auth/auth-service";

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },

  mounted() {
    eventBus.$on("rerenderNavbar", () => {
      this.$forceUpdate();
      this.$toastr.s("Successfully logged in!");
    });

    this.isLoggedIn = isLoggedIn();
  },

  destroyed() {
    eventBus.$off("rerenderNavbar", this.$forceUpdate());
  },

  methods: {
    LogOut() {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
};
</script>

<style>
.navbar {
  background-color: #f8f8f8;
  padding: 16px;
}

.navbar-nav {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: flex-end; /* Align links to the right */
}

.nav-item {
  margin-left: 16px; /* Adjust spacing between links */
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  color: #007bff;
}
</style>
