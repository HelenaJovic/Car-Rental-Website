<template>
  <div class="main-container">
    <navbar></navbar>
    <div class="header-container">
      <div class="price-container">
        <h2>Total:</h2>
        <h2>{{ cart.price }}</h2>
      </div>
      <div class="rent-container">
        <button class="button1" v-on:click="confirm()">Confirm rent</button>
      </div>
    </div>
    <div class="vehicles-container">
      <cartItem
        v-for="vehicle in cart.vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
        :vehicleMethods="vehicleMethods"
      >
      </cartItem>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import jwt_decode from "jwt-decode";
import CartItem from "./CartItem.vue";

export default {
  components: {
    navbar: Navbar,
    cartItem: CartItem
  },

  data() {
    return {
      cart: {
        vehicles: [],
        user: null,
        price: null,
        startDate: null,
        endDate: null,
        rentalId: null
      }
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    axios
      .get(`http://localhost:8081/baskets/${decoded.id}`)
      .then(response => {
        this.cart = response.data;
      })
      .catch(error => {
        console.error(error);
        window.alert("Your basket is empty");
      });
  },

  methods: {
    increase(vehicle) {
      const index = this.cart.vehicles.findIndex(v => v.id === vehicle.id);
      if (index !== -1) {
        this.cart.vehicles[index].counter++;
        this.cart.vehicles[index].ukupna =
          this.cart.vehicles[index].price * this.cart.vehicles[index].counter;
      }

      this.updateTotalPrice();
    },
    decrease(vehicle) {
      const index = this.cart.vehicles.findIndex(v => v.id === vehicle.id);
      if (index !== -1 && this.cart.vehicles[index].counter > 1) {
        this.cart.vehicles[index].counter--;
        this.cart.vehicles[index].ukupna =
          this.cart.vehicles[index].price * this.cart.vehicles[index].counter;
      }
      this.updateTotalPrice();
    },

    remove(vehicle) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .delete(
          `http://localhost:8081/baskets/deleteVehicle/${decoded.id}/${vehicle.id}`
        )
        .then(response => {
          this.cart.vehicles = this.cart.vehicles.filter(
            v => v.id !== vehicle.id
          );
          this.updateTotalPrice();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },

    updateTotalPrice() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      let totalPrice = 0;
      this.cart.vehicles.forEach(vehicle => {
        totalPrice += vehicle.price * vehicle.counter;
      });
      this.cart.price = totalPrice;

      const requestData = {
        price: totalPrice
      };

      axios
        .post(
          `http://localhost:8081/baskets/updatePrice/${decoded.id}`,
          requestData
        )
        .then(response => {
          console.log("Price successfully changed:", response.data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },

    confirm() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      const start = new Date(this.cart.startDate);
      const end = new Date(this.cart.endDate);

      const durationInMilliseconds = end - start;

      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

      const roundedDuration = Math.round(durationInDays);

      const order = {
        id: null,
        vehicles: this.cart.vehicles,
        rentalObject: this.cart.rentalId,
        date: this.cart.startDate,
        duration: roundedDuration,
        price: this.cart.price,
        buyer: decoded.id,
        orderStatus: "Obrada"
      };

      axios
        .post("http://localhost:8081/orders", order)
        .then(response => {
          this.$toastr.s("Successfully rent!");
          this.$router.push("/");
        })
        .catch(err => {
          this.$toastr.e("Rent could not processed!");
        });

      axios.delete(`http://localhost:8081/baskets/${this.cart.id}`);

      axios
        .post(`http://localhost:8081/users/updatePoints/${decoded.id}`, {
          points: this.cart.price
        })
        .then(response => {
          this.$toastr.s("Your points are successfully updated!");
        })
        .catch(error => {
          this.$toastr.e("Error!");
        });
    }
  },

  computed: {
    vehicleMethods() {
      return {
        increase: this.increase,
        decrease: this.decrease,
        remove: this.remove
      };
    }
  }
};
</script>

<style scoped>
.main-coontainer {
  display: flex;
  flex-direction: row;
  flex-grow: 2;
}

.header-container {
  display: flex;

  justify-content: space-between;
  flex-direction: row;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: rgba(122, 136, 220, 0.4);
  margin: 20px 20px 0px 20px;
}
.price-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.rent-container {
  align-self: flex-end;
}

.button1 {
  padding: 0.5rem 1rem;
  background-color: #266fc2;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 2px 0px 2px 70px;
  font-size: 18px;
}

.vehicles-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0px 20px 20px 20px;
  background-image: url("../assets/images/auto.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
