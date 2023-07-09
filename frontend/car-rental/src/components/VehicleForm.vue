<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
      <form>
        <h2 id="header">Add New Vehicle</h2>
        <label for="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          v-model="form.brand"
          :class="['custom-input', { error: !form.brand }]"
          required
        />

        <label for="model">Model:</label>
        <input
          type="text"
          id="model"
          v-model="form.model"
          :class="['custom-input', { error: !form.model }]"
          required
        />

        <label for="price">Price:</label>
        <input
          type="text"
          id="price"
          v-model="form.price"
          :class="['custom-input', { error: !form.price }]"
          required
        />

        <label for="type">Type:</label>
        <select
          id="fuel"
          v-model="form.vehicleType"
          :class="['custom-input', { error: !form.vehicleType }]"
          required
        >
          <option value="">Select vehicle Type</option>
          <option value="car">Car</option>
          <option value="track">Track</option>
          <option value="mobilehome">Mobile Home</option>
        </select>

        <label for="fuel">Fuel Type:</label>
        <select
          id="fuel"
          v-model="form.fuelType"
          :class="['custom-input', { error: !form.fuelType }]"
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>

        <label for="consumption">Consumption:</label>
        <input
          type="text"
          id="cons"
          v-model="form.consumption"
          :class="['custom-input', { error: !form.consumption }]"
          required
        />

        <label for="doors">Number of Doors:</label>
        <input
          type="number"
          id="doors"
          v-model="form.doorsNum"
          :class="['custom-input', { error: !form.doorsNum }]"
          required
        />

        <label for="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          v-model="form.peopleNum"
          :class="['custom-input', { error: !form.peopleNum }]"
          required
        />

        <label for="image">Image URL:</label>
        <div class="image-input-container">
          <input
            type="text"
            id="txt"
            v-model="form.image"
            :class="['custom-input', { error: !form.image }]"
            required
          />

          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            style="display: none"
            ref="fileInput"
          />
          <button
            type="button"
            v-on:click.prevent="UploadImage()"
            class="buttonForImg"
          >
            ...
          </button>
        </div>

        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>

        <button
          type="submit"
          v-on:click.prevent="addVehicleandUpdateRentalCar()"
        >
          Add Vehicle
        </button>
      </form>
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
      rentalCarId: null,
      form: {
        brand: "",
        model: "",
        price: 0,
        vehicleType: "",
        rentalObject: null,
        transType: "Manual",
        fuelType: "",
        consumption: "",
        doorsNum: 0,
        peopleNum: 0,
        description: "",
        image: "",
        status: "Available"
      }
    };
  },
  methods: {
    addVehicleandUpdateRentalCar() {
      this.form.rentalObject = this.rentalCarId;
      if (!this.isFormValid()) {
        this.$toastr.e("Please fill in all fields");
        return;
      }

      axios
        .post(`http://localhost:8081/vehicles/${this.rentalCarId}`, this.form)
        .then(() => {
          this.$toastr.s("Vehicle successfully added!");
          this.$router.push({ path: "/singleObject/" + this.rentalCarId });
        })
        .catch(err => {
          console.log(err);
          this.$toastr.e("Error adding vehicle!");
        });
    },

    isFormValid() {
      return (
        this.form.brand &&
        this.form.model &&
        this.form.price &&
        this.form.vehcleType &&
        this.form.fuelType &&
        this.form.consumption &&
        this.form.doorsNum &&
        this.form.peopleNum &&
        this.form.image
      );
    },

    UploadImage() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = `/static/${file.name}`;
      }
    }
  },
  mounted() {
    this.rentalCarId = this.$route.params.id;
    console.log(this.rentalCarId);
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

.custom-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.error {
  border-color: red;
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

.image-input-container {
  display: flex;
  align-items: center;
}

.image-input-container input[type="text"] {
  flex: 1;
  margin-right: 10px;
}

.image-input-container button {
  margin-left: 10px;
}

.buttonForImg {
  background-color: gray;
}
</style>
