<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item nav-item-logo">
        <router-link to="/" class="nav-link" exact-active-class="active-link">
          <img
            src="../assets/images/rental222.png"
            alt="Car Rental Logo"
            class="nav-logo"
          />
        </router-link>
      </li>

      <li class="nav-item" v-if="!isLoggedIn || isBlocked">
        <router-link
          to="/login"
          class="nav-link"
          exact-active-class="active-link"
          >Login</router-link
        >
      </li>
      <li class="nav-item" v-if="!isLoggedIn">
        <router-link
          to="/register"
          class="nav-link"
          exact-active-class="active-link"
          >Register</router-link
        >
      </li>

      <li class="nav-item" v-if="isAdministrator">
        <router-link
          to="/registerManager"
          class="nav-link"
          exact-active-class="active-link"
          >Register manager</router-link
        >
      </li>
      <li class="nav-item" v-if="isBuyer && isLoggedIn && !isBlocked">
        <router-link
          to="/makeOrder"
          class="nav-link"
          exact-active-class="active-link"
          >Make order</router-link
        >
      </li>

      <li class="nav-item" v-if="isLoggedIn && !isBlocked">
        <router-link
          to="/"
          v-on:click.native="LogOut()"
          class="nav-link"
          exact-active-class="active-link"
          >Log Out</router-link
        >
      </li>

      <li class="nav-item" v-if="isLoggedIn && !isBlocked">
        <router-link
          to="/updateUser"
          class="nav-link"
          exact-active-class="active-link"
          ><img
            src="../assets/images/your_profile.png"
            alt="Your profile"
            class="your_profile"
          />
        </router-link>
      </li>

      <li class="nav-item" v-if="isBuyer && isLoggedIn && !isBlocked">
        <router-link
          to="/cartOverview"
          class="nav-link"
          exact-active-class="active-link"
          ><img
            src="../assets/images/cart.png"
            alt="cart preview"
            class="your_profile"
          />
        </router-link>
      </li>
    </ul>
  </nav>
</template>






<script>
import jwt_decode from "jwt-decode";
import { eventBus } from "../main.js";
import { isLoggedIn } from "../auth/auth-service";
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false,
      isAdministrator: false,
      isBuyer: false,
      isBlocked: false
    };
  },

  mounted() {
    eventBus.$on("rerenderNavbar", () => {
      this.$forceUpdate();
      this.$toastr.s("Successfully logged in!");
      this.checkIfBlocked();
    });

    this.isLoggedIn = isLoggedIn();

    this.checkIfAdministratorOrBuyer();
    this.checkIfBlocked();
  },

  destroyed() {
    eventBus.$off("rerenderNavbar", this.$forceUpdate());
  },

  methods: {
    LogOut() {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    },

    checkIfAdministratorOrBuyer() {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.role == "Administrator") {
          this.isAdministrator = true;
        } else if (decoded.role == "Buyer") {
          this.isBuyer = true;
        }
      }
    },

    checkIfBlocked() {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwt_decode(token);
        axios
          .get(`http://localhost:8081/users/${decoded.id}`)
          .then(response => {
            this.isBlocked = response.data.isBlocked;
          })
          .catch(error => {
            console.error(error);
            this.$toastr.e("An error occurred while checking user's blocked status.");
          });
      }
    }
  }
};
</script>



<style>
.navbar {
  background-color: rgb(86, 105, 126);
  padding: 16px;
  position: relative;
}

.nav-logo {
  width: 80px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 4%;
  transform: translate(-50%, -50%);
}

.navbar-nav {
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  gap: 1rem;

  padding: 0;
  justify-content: flex-end; /* Align links to the right */
}

.nav-item {
  padding: 0px 10px 0px 10px;
}

.your_profile {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.nav-link {
  color: whitesmoke;
  text-decoration: none;
  font-weight: bold;
  
}

.nav-link:hover {
  color: #007bff;
}

.active-link {
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  padding: 8px 12px;
}
</style>