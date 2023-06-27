<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item nav-item-logo">
        <router-link to="/" class="nav-link">
          <img
            src="../assets/images/rental22.png"
            alt="Car Rental Logo"
            class="nav-logo"
          />
        </router-link>
      </li>
      <li class="nav-item nav-item-left">
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
        <router-link
          to="/registerManager"
          v-if="isAdministrator"
          class="nav-link"
          >Register manager</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/updateUser" v-if="isLoggedIn" class="nav-link"
          >Your profile</router-link
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
import jwt_decode from "jwt-decode";
import { eventBus } from "../main.js";
import { isLoggedIn } from "../auth/auth-service";

export default {
  data() {
    return {
      isLoggedIn: false,
      isAdministrator: false
    };
  },

  mounted() {
    eventBus.$on("rerenderNavbar", () => {
      this.$forceUpdate();
      this.$toastr.s("Successfully logged in!");
    });

    this.isLoggedIn = isLoggedIn();
    this.checkIfAdministrator();
  },

  destroyed() {
    eventBus.$off("rerenderNavbar", this.$forceUpdate());
  },

  methods: {
    LogOut() {
      localStorage.removeItem("token");
      window.location.reload();
    },

    checkIfAdministrator() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      if (decoded.role == "Administrator") {
        this.isAdministrator = true;
      }
    }
  }
};
</script>

<style>
.navbar {
  background-color: lightslategray;
  padding: 16px;
  position: relative;
}

.nav-logo {
  width: 100px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translate(-50%, -50%);
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
  color: whitesmoke;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  color: #007bff;
}

.nav-item-left {
  margin-right: 1%;
}
</style>
