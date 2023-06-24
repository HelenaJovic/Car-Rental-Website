<template>
    <div >
        <navBar></navBar>
        <div class="main-container">
      <form >
        <h2 id="header">Add New Vehicle</h2>
        <label for="brand">Brand:</label>
        <input type="text" id="brand" v-model="form.brand" required>
  
        <label for="model">Model:</label>
        <input type="text" id="model" v-model="form.model" required>
  
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="form.price" required>
  
        <label for="type">Type:</label>
        <input type="text" id="type" v-model="form.type" required>
  
        <label for="fuel">Fuel Type:</label>
            <select id="fuel" v-model="form.fuelType" required>
            <option value="">Select Fuel Type</option>
            <option value="diesel">Diesel</option>
            <option value="gasoline">Gasoline</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
            </select>

  
        <label for="doors">Number of Doors:</label>
        <input type="number" id="doors" v-model="form.numDoors" required>
  
        <label for="capacity">Capacity:</label>
        <input type="number" id="capacity" v-model="form.capacity" required>
  
        <label for="image">Image URL:</label>
        <input type="text" id="image" v-model="form.image" required>
  
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
  
        <button type="submit" v-on:click.prevent="addVehicle()">
              Add Vehicle
            </button>      </form>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "./Navbar.vue";
  import axios from "axios";

  export default {
    components: {
    navBar: Navbar
  },
    data() {
      return {
        form: {
          brand: '',
          model: '',
          price: 0,
          type: '',
          fuelType: '',
          numDoors: 0,
          capacity: 0,
          image: '',
          description: ''
        
    }
      };
    },
    methods: {
      addVehicle() {
        axios
        .post("http://localhost:8081/vehicles", this.form)
        .then(response => {
          this.$toastr.s("Successfully vehicle added!");
          this.$router.push("/");
        })
        .catch(err => {
          this.$toastr.e("Some mistake!");
        });
        
      },
      resetForm() {
        // Reset the form data
        this.vehicle = {
          brand: '',
          model: '',
          price: 0,
          type: '',
          fuelType: '',
          numDoors: 0,
          capacity: 0,
          image: '',
          description: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
/* Component-specific styles */
.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
  padding: 60px;
}
form {
  display: grid;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 5px;
}

label {
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

textarea {
  resize: vertical;
}

h2#header {
  margin-bottom: 1.5rem;
  text-align: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 0.5rem;
}
</style>
