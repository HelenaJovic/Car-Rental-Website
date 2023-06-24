<template>
  <div>
    <div class="rent-a-car-container">
      <div class="rent-a-car-card">
        <h2>{{ carObject.name }}</h2>
        <p>Working hours: {{ carObject.workHours }}</p>
        <p>Status: {{ carObject.status ? "Opened" : "Closed" }}</p>
        <p>Location: {{ carObject.location }}</p>
        <img :src="carObject.imagePath" class="car-logo" alt="Car Logo" />
        <p v-if="carObject.grade">Average grade: {{ carObject.grade }}</p>
        <button class="form-group" type="button" v-on:click="addVehicle(carObject.id)">Add Vehicle</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      carObject: {
        name: "",
        workHours: "",
        status: "",
        location: "",
        imagePath: "",
        grade: "",
        vehicles: []
      }
    };
  },
  methods: {
    addVehicle(id) {
      this.$router.push({ path: "/vehicle/" + id });
      
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8081/cars/${this.id}`)
      .then(response => {
        this.carObject = response.data;
      })
      .catch(error => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });
  }
};

</script>

<style scoped>
.rent-a-car-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.rent-a-car-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.rent-a-car-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.rent-a-car-card p {
  font-size: 16px;
  margin-bottom: 8px;
}

.rent-a-car-card .car-logo {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.rent-a-car-card .grade-info {
  font-size: 18px;
  color: #888;
}

.rent-a-car-card .grade-info span {
  color: #f00;
  font-weight: bold;
}

.form-group{
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  border: none;
}
</style>
