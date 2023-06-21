<template>
  <div>
    <navBar></navBar>
    <div class="rent-a-car-container">
      <h1>Rental objects</h1>

      <div class="search-container">
        <input
          type="text"
          v-model="search"
          class="search-input"
          placeholder="Name,Location,Grade,Vehicle Type"
        />
        <p>🔍</p>
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

export default {
  components: {
    RentACarCard,
    navBar: Navbar
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      cars: [],
      search: ""
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
    }
  },

  computed: {
    filterObjects: function() {
      const searchValues = this.search.split(",").map(value => value.trim());

      return this.cars.filter(car => {
        let matchesSearch = true;

        for (const searchValue of searchValues) {
          if (searchValue) {
            const searchRegex = new RegExp(searchValue, "i");

            const matchesName = car.name.match(searchRegex);

            const matchesLocation = car.location.match(searchRegex);

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
  background-color: lightgray;
}

.rent-a-car-container h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.rent-a-car-list {
  padding: 2rem;
  border: 1px solid #e0e0e0;
  height: 90%;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: row;
}

.search-container p {
  font-size: 1.7rem;
  margin-left: 0.5rem;
}

.search-input {
  width: 280px;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 1rem;
}

.rent-a-car-container > .search-container {
  align-self: flex-start;
  margin-left: 3rem;
}
</style>
