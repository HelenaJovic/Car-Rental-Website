<template>
  <div>
    <navBar></navBar>

    <div class="rent-a-car-container">
      <div class="grid-item-1">
        <div class="flex-item">
          <h2>{{ carObject.name }}</h2>
          <img :src="carObject.imagePath" class="car-logo" alt="Car Logo" />

          <p>Working hours: {{ carObject.workHours }}</p>

          <p>Location: {{ carObject.location.adress }}</p>

          <p v-if="carObject.grade">Average grade: {{ carObject.grade }}</p>
          <p :class="['status', carObject.status ? 'opened' : 'closed']">
            Status: {{ carObject.status ? "Opened" : "Closed" }}
          </p>
          <button
            class="form-group"
            type="button"
            v-on:click="addVehicle(carObject.id)"
          >
            Add Vehicle
          </button>
        </div>
      </div>

      <div class="helping-container">
        <div class="grid-item-2">
          <vehicleCard
            v-for="vehicle in carObject.vehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
            :rental-car-id="id"
            :update-car="updateCar"
            :delete-car="deleteCar"
          ></vehicleCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import VehicleCard from "./VehicleCard.vue";

export default {
  components: {
    navBar: Navbar,
    vehicleCard: VehicleCard
  },
  data() {
    return {
      id: this.$route.params.id,
      vehicleId: 0,
      carObject: {
        name: "",
        workHours: "",
        status: "",
        location: {
          adress: ""
        },
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
    deleteCar(vehicleId, id) {
      // Implement your logic to delete the car with the given ID
      // For example:

      axios
        .delete(`http://localhost:8081/vehicles/${vehicleId}/${id}`)
        .then(() => {
          this.$router.push({ path: "/singleObject/" + id });
          this.$toastr.s("Succesufully deleted!");
        })
        .catch(error => {
          console.log(error);
          this.$toastr.e("Can not delete car!");
        });
    },
    updateCar(vehicleId, id) {
      this.$router.push({ path: "/updateCar/" + vehicleId + "/" + id });
    }
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
