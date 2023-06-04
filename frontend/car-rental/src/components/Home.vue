<template>
  <div class="rent-a-car-container">
    <h1>Rent a car</h1>
    <div class="rent-a-car-list">
      <RentACarCard v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </div>
</template>

<script>
import RentACarCard from './RentACarCard.vue';
import 'regenerator-runtime/runtime';
import axios from 'axios';

export default {
  components: {
    RentACarCard,
  },
  mounted() {
      this.getData();
  },
  data() {
    return {
      cars: []
    };
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8081/cars/sortedCars');
        this.cars = response.data;
        console.log(this.cars)
      } catch (error) {
        console.error(error);
      }
    },
    
  }
};
</script>

<style scoped>
.rent-a-car-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-color: #030112;
}

.rent-a-car-container h1 {
 
  font-size: 2rem;
  margin-bottom: 2rem;
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
</style>
