<template>
    <div v-if="order">
      <navBar></navBar>
  
      <div class="rent-a-car-container" >
        <div class="grid-item-1">
          <div class="flex-item">
            <h2>{{ order.nameRental }}</h2>
            <img :src="order.logoR" class="car-logo" alt="Car Logo" />
  
            <p>Working hours: {{ order.workHours }}</p>
               
            <p>Location: {{ order.location }}</p>
            <p :class="['status', order.status ? 'opened' : 'closed']">
              Status: {{ order.status ? "Opened" : "Closed" }}
            </p>
          </div>
        </div>
  
        <div class="helping-container">
          <div class="grid-item-2">
            <vehicleCardOrder
              v-for="vehicle in order.vehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
              @add-to-cart="addToCart"
            ></vehicleCardOrder>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Navbar from "./Navbar.vue";
  import VehicleCardOrder from "./VehicleCardOrder.vue";
  import jwt_decode from "jwt-decode";

  export default {
    components: {
      navBar: Navbar,
      vehicleCardOrder: VehicleCardOrder
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
  return {
    vehicleId: 0,
    order: null,
    rentalId: 0,
  };
},
methods: {
  addToCart(vehicle) {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const idUser = decoded.id;
    
    const cartData = {
      vehicles: [],
      user: idUser,
     price:""
    };

    cartData.vehicles.push(vehicle);
    console.log(cartData)
    cartData.price+=vehicle.price;
    
    
   
    axios
      .post(`http://localhost:8081/baskets/${idUser}`, cartData)
      .then(() => {
        this.$toastr.s("Vehicle successfully added in basket!");
      })
      .catch(err => {
        console.log(err);
        this.$toastr.e("Error adding vehicle!");
      });
  }


    },
    mounted() {
      this.rentalId = this.$route.params.id; // Ispravljena greška u pristupanju rentalId
      const startDate = this.$route.query.startDate;
      const endDate = this.$route.query.endDate;
  
      axios
        .get(`http://localhost:8081/cars/filtered/${this.rentalId}`, { // Ispravljena greška u pristupanju rentalId
          params: {
            startDate: startDate,
            endDate: endDate
          }
        })
        .then(response => {
          this.order = response.data;
        })
        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching rental data");
        });
    }
  };
  </script>
  
  <style scoped>
  .rent-a-car-container {
    display: grid;
    grid-template-columns: 0.8fr 2fr;
    justify-content: stretch;
    align-content: center;
    min-height: 100vh;
    background-image: url("../assets/images/auto.jpg");
    background-size: cover;
    background-position: center;
  }
  
  .helping-container {
    padding: 20px;
  }
  .grid-item-1 {
    grid-column: 1/2;
    grid-row: span 2;
    padding: 20px;
  }
  
  .grid-item-2 {
    grid-row: span 2;
    padding: 20px;
  
    border: 1px solid #e0e0e0;
    height: 90%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    grid-gap: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
  }
  
  .flex-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6x;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 30px;
    font-weight: bold;
    color: rgb(27, 26, 26);
    padding: 10px;
    text-transform: uppercase;
    font-family: "Arial", sans-serif;
  }
  
  p {
    font-size: 20px;
    color: rgb(27, 26, 26);
    padding: 10px;
    text-align: left;
  }
  
  .car-logo {
    width: 200px;
    height: 180px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  p.status {
    font-weight: bold;
    color: #fff;
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
  }
  
  p.status.opened {
    background-color: #28a745;
  }
  
  p.status.closed {
    background-color: #dc3545;
  }
  
  p.grade {
    color: #ff9800;
    font-weight: bold;
    font-size: 24px;
    text-align: left;
  }
  
  .car-logo:hover {
    transform: scale(1.1);
  }
  
  .form-group {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px;
  
  }
  </style>
  