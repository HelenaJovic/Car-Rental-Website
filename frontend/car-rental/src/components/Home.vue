<template>
  <div>
    <navBar></navBar>
    <div class="rent-a-car-container">
      <div class="first-container">
        <h1>Rental objects</h1>
      </div>
      <div class="second-container">
        <div class="search-container">
          <input
            type="text"
            v-model="search"
            class="search-input"
            placeholder="Name,Location,Grade,Vehicle Type"
          />
          <p>🔍</p>
        </div>
        <div class="filter-container">
          <button
            v-if="!showFilter"
            type="submit"
            v-on:click.prevent="toggleFilter()"
          >
            Filter
          </button>
          <transition name="slide">
            <div class="filter-slide" v-if="showFilter">
              <div>
                <label for="vehicle-type-filter">Vehicle Type:</label>
                <select v-model="vehicleTypeFilter" id="vehicle-type-filter">
                  <option value="">All</option>
                  <option v-for="type in vehicleTypes" :value="type">{{
                    type
                  }}</option>
                </select>
              </div>
              <div>
                <label for="fuel-type-filter">Fuel Type:</label>
                <select v-model="fuelTypeFilter" id="fuel-type-filter">
                  <option value="">All</option>
                  <option v-for="type in fuelTypes" :value="type">{{
                    type
                  }}</option>
                </select>
              </div>
              <div>
                <label for="show-only-open-objects"
                  >Show Only Open Objects:</label
                >
                <input
                  type="checkbox"
                  v-model="showOnlyOpenObjects"
                  id="show-only-open-objects"
                />
              </div>
            </div>
          </transition>
        </div>
        <div class="combobox-container">
          <label for="sort-by">Sort By:</label>
          <select
            v-model="selectedSortField"
            id="sort-by"
            class="custom-select"
          >
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="grade">Grade</option>
            <option value="location">Location</option>
          </select>
          <router-link to="/addObject" v-if="IsAdministrator">
            <img src="../assets/images/add.png" alt="Add logo" class="image" />
          </router-link>
        </div>
      </div>

      <div class="rent-a-car-list">
        <RentACarCard v-for="car in filterObjects" :key="car.id" :car="car" />
      </div>
    </div>
  </div>
</template>

<script>
import RentACarCard from "./RentACarCard.vue";
import "regenerator-runtime/runtime";
import axios from "axios";
import Navbar from "./Navbar.vue";
import jwt_decode from "jwt-decode";

export default {
  components: {
    RentACarCard,
    navBar: Navbar
  },
  mounted() {
    this.getData();
    this.checkIfAdministrator();
  },
  data() {
    return {
      cars: [],
      search: "",
      selectedSortField: "",
      IsAdministrator: false,
      name: "",
      showFilter: false,
      vehicleTypeFilter: "",
      fuelTypeFilter: "",
      showOnlyOpenObjects: false,
      vehicleTypes: ["Mobile Home", "Car", "Truck"],
      fuelTypes: ["Gasoline", "Diesel", "Hybrid", "Electric"]
    };
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(
          "http://localhost:8081/cars/sortedCars"
        );
        this.cars = response.data;
        console.log(this.cars);
      } catch (error) {
        console.error(error);
      }
    },

    sortByField(cars, field) {
      cars.sort((car1, car2) => {
        const field1 = car1[field];
        const field2 = car2[field];

        if (field1 < field2) {
          return -1;
        } else if (field1 > field2) {
          return 1;
        } else {
          return 0;
        }
      });
    },

    checkIfAdministrator() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      if (decoded.role == "Administrator") {
        this.IsAdministrator = true;
      }
    },

    toggleFilter() {
      this.showFilter = !this.showFilter;
    }
  },

  computed: {
    filterObjects: function() {
      const searchValues = this.search.split(",").map(value => value.trim());

      const filteredCars = this.cars.filter(car => {
        let matchesSearch = true;

        for (const searchValue of searchValues) {
          if (searchValue) {
            const searchRegex = new RegExp(searchValue, "i");

            const matchesName = car.name.match(searchRegex);

            const matchesLocation = car.location.adress.match(searchRegex);

            const matchesGrade = car.grade.match(searchRegex);
            const matchesVehicleType = car.vehicles.some(vehicle =>
              vehicle.vehicleType.match(searchRegex)
            );

            matchesSearch =
              matchesSearch &&
              (matchesName ||
                matchesGrade ||
                matchesLocation ||
                matchesVehicleType);
          }
        }

        return matchesSearch;
      });

      const filteredByVehicleType = this.vehicleTypeFilter
        ? filteredCars.filter(car =>
            car.vehicles.some(vehicle =>
              vehicle.vehicleType
                .toLowerCase()
                .includes(this.vehicleTypeFilter.toLowerCase())
            )
          )
        : filteredCars;

      const filteredByFuelType = this.fuelTypeFilter
        ? filteredByVehicleType.filter(car =>
            car.vehicles.some(vehicle =>
              vehicle.fuelType
                .toLowerCase()
                .includes(this.fuelTypeFilter.toLowerCase())
            )
          )
        : filteredByVehicleType;

      const filteredByOpenObjects = this.showOnlyOpenObjects
        ? filteredByFuelType.filter(car => car.status === true)
        : filteredByFuelType;

      if (this.selectedSortField) {
        this.sortByField(filteredByOpenObjects, this.selectedSortField);
      }

      return filteredByOpenObjects;
    }
  }
};
</script>

<style scoped>
.rent-a-car-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url(../assets/images/back3.jpg);
  background-size: cover;
  background-position: center;
}

.rent-a-car-container h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.rent-a-car-container h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.rent-a-car-list {
  padding: 2rem;
  border: 1px solid #e0e0e0;
  height: 90%;
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-gap: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
}

.second-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 0px 0px 5px 30px;
}
.search-container p {
  font-size: 1.7rem;
  margin-left: 0.7rem;
}

.search-input {
  flex: 1;
  width: 280px;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.combobox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0px 40px 5px 0px;
}

.combobox-container label {
  margin-right: 0.5rem;
  font-size: 1.3rem;
}

.custom-select {
  width: 100px;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.first-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

.image {
  width: 32px;
  height: 33px;
  margin-left: 5px;
}

.filter-container button {
  background-color: rgb(192, 171, 171);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;

  height: 40px;
  width: 100px;
}

.first-container h1 {
  font-family: georgia, serif;
  font-size: 50px;
  letter-spacing: 0.1em;
  line-height: 200%;
  padding-top: 11px;
  text-shadow: 0 2px 4px rgba(231, 219, 219, 0.8);
  background-image: linear-gradient(to right, #1a2433, #283655);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  position: relative;
  animation: gradientAnimation 5s ease infinite;
}

.filter-slide {
  display: flex;
  gap: 1rem;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
