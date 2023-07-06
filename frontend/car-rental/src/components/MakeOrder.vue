<template>
    <div>
      <navBar></navBar>
      <div class="main-container">
        <div class="displayOrder ">

            <div class="order-header">
              <div class="search-box">
  <label>Start Date 🗓️:</label>
  <input
    type="date"
    v-model="searchStartDate"
    class="search-input"
    :min="getCurrentDate()"
    placeholder="StartDate"
  />
</div>

<div class="search-box">
  <label>End Date 🗓️:</label>
  <input
    type="date"
    v-model="searchEndDate"
    class="search-input"
    :min="searchStartDate" 
    placeholder="StartDate"
  />
</div>

            </div>
<ul class="order-list">
    <li v-for="order in orders" :key="order.id" class="order-orderd">
      <div class="order-orderd-container">

      <div class="order-container">
        <h2 class="name">{{ order.nameRental }}</h2>
        <img :src="order.logoR" class="order-logo" alt="Logo" />
        <router-link :to="{ name: 'makeOrderSingle', params: { id: order.rentalId }, query: { startDate: searchStartDate, endDate: searchEndDate } }">
  <h3 class="details">Show more</h3>
</router-link>


      </div>

      <div class="vehicle-container">
        <div class="vehicle-scroll">
          <OrderCard
            v-for="vehicle in order.vehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
          ></OrderCard>
        </div>
      </div>
    </div>

    </li>
</ul>
</div>

</div>
</div>
</template>



<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import OrderCard from "./OrderCard.vue";


export default {
  components: {
    navBar: Navbar,
    OrderCard: OrderCard,

  },
  data() {
    return {
      orders: [] ,
      searchStartDate: "" ,
      searchEndDate: ""
           };
  },
  methods: {
  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
,
  mounted() {
  // Prati promene searchStartDate i searchEndDate
  this.$watch(
    () => [this.searchStartDate, this.searchEndDate],
    ([startDate, endDate]) => {
      // Proveri da li su oba datuma uneta
      if (startDate && endDate) {
        axios
          .get(`http://localhost:8081/cars/${startDate}/${endDate}`)
          .then(response => {
            this.orders = response.data;
          })
          .catch(error => {
            console.error(error);
            window.alert("An error occurred while fetching orders data");
          });
      }
    }
  );
}}





</script>

<style scoped>
.displayOrder{
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
flex-grow: 3;
gap: 5rem;
padding: 20px;}

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
  padding: 5px;
  border: none;
  border-radius: 3px;
}

.search-input:focus {
  outline: none;
}

.search-box label {
  margin-left: 5px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-image: url(../assets/images/back4.jpg);
  background-size: cover;
  background-position: center;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.order-list {
  list-style: none;
  display: flex;
  max-width: 102%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.order-orderd {
  gap: 20rem;
  flex-wrap: wrap;
  background-image: url(../assets/images/back2.jpg);
  background-size: cover;
  background-position: center; 
   padding: 20px;
  border-radius: 5px;
}

.name {
  font-size: 25px;
  color: rgb(212, 233, 242);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  transition: color 0.3s ease;
  align-self: center;
  text-align: center;
}

.order-logo {
  width: 70%;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  filter: brightness(90%) contrast(110%);
  align-self: center;
  border: 2px solid #fff; /* Debljina i boja bordera */
}
.order-logo:hover {
  transform: scale(1.1);
}

.order-orderd-container {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
  align-items: center;
}

.order-container {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc; /* Dodat border sa bojom #ccc */
  border-radius: 5px; /* Dodat border-radius za blago zaobljen izgled */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Dodat box-shadow efekat */
  padding: 20px; /* Dodat padding za unutrašnji prostor */
  background-color: rgba(26, 101, 141, 0.7)/* Promenjen kod za postavljanje transparentnosti */


}

.order-container:hover {
  transform: scale(1.1);
  background-color: rgba(142, 194, 220, 0.8)/* Promenjen kod za postavljanje transparentnosti */

}

.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  display: flex;
  justify-content: space-between;
  gap: 1em;
  flex-direction: row;
  background-position: center;
  padding: 20px;
}

.vehicle-container {
  flex-grow: 1;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  gap: 5rem;
  box-shadow: none; /* Uklonite box-shadow */
  transition: transform 0.3s ease;
  cursor: pointer;
  justify-items: center;
  background-color: rgba(144, 15, 15, 0)/* Promenjen kod za postavljanje transparentnosti */
}


.vehicle-scroll {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 250px; 
  max-width: 1000px;
  gap: 1rem;
  flex-direction: column;
  justify-content: center; /* Center items horizontally */

}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(31, 31, 158,0.6);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.details {
  font-size: 1.2rem;
  color: rgb(193, 228, 241);
}

.details:hover {
  color: black;
align-content: flex-end;
}

</style>