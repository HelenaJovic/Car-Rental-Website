<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
      <div class="register-form">
        <h2>Your profile</h2>
        <form>
          <div class="form-group">
            <div class="image-manager">
            <img :src="form.image" class="order-logo"> 
          </div>
            <label for="username">Username</label>
            <input type="text" id="username" v-model="form.username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" />
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" id="surname" v-model="form.surname" />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" v-model="form.gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="birthday">Birthday</label>
            <input type="date" id="birthday" v-model="form.birthday" />
          </div>
          <div class="form-group">
            <button type="button" v-on:click="submitForm()">Update</button>
          </div>
        </form>
      </div>
      <div class="displayOrder " v-if="IsBuyer">

        <div class="order-header">
          <div class="search-box">
            <input
              type="text"
              v-model="search"
              class="search-input"
              placeholder="Name,Price1 - Price2,Date"
            /><label>🔍</label>
          </div>
          <div class="title-container">
            <h2>Your orders</h2>
          </div>
          <div class="filter-box">
            <label for="sort-by">Sort By:</label>
            <select
              v-model="selectedSortField"
              id="sort-by"
              class="custom-select"
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="cheapest">Cheapest</option>
              <option value="mostExpensive">Most Expensive</option>

              <option value="date">Date</option>
            </select>
          </div>
        </div>
        <ul class="order-list">
          <li
            v-for="order in filterObjects"
            :key="order.orderId"
            class="order-orderd"
          >
            <div class="order-orderd-container">
              <div class="order-container">
                <h2 class="name">{{ order.name }}</h2>
                <img :src="order.logo" class="order-logo" alt="Logo" />

                <p class="labels2">Date 📅: {{ order.date }}</p>

                <p class="labels2">Duration ⌛: {{ order.duration }}</p>
                <p class="labels2">Final Price 💸: {{ order.price }}</p>
                <p
                  :class="[
                    'orderStatus',
                    order.orderStatus.toLowerCase() === 'approved'
                      ? 'approved'
                      : order.orderStatus.toLowerCase() === 'picked-up'
                      ? 'picked-up'
                      : order.orderStatus.toLowerCase() === 'returned'
                      ? 'returned'
                      : order.orderStatus.toLowerCase() === 'rejected'
                      ? 'rejected'
                      : 'canceled'
                  ]"
                >
                  Status:
                  {{
                    order.orderStatus.toLowerCase() === "approved"
                      ? "Approved"
                      : order.orderStatus.toLowerCase() === "picked-up"
                      ? "Picked Up"
                      : order.orderStatus.toLowerCase() === "returned"
                      ? "Returned"
                      : order.orderStatus.toLowerCase() === "rejected"
                      ? "Rejected"
                      : "Canceled"
                  }}
                </p>
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
      <div class="displayOrder " v-if="IsManager">

<div class="order-header">
  <div class="search-box">
    <input
  type="text"
  v-model="search"
  class="search-input"
  placeholder="Price1 - Price2,Date1 - Date2"
/><label>🔍</label>

  </div>
  <div class="title-container"  >
  <router-link :to="'/singleObject/' + rentalId">

<h2 class="changeName">{{name}}</h2>
</router-link>
</div>
  <div class="filter-box">
    <label for="sort-by">Sort By:</label>
  <select
    v-model="selectedSortField"
    id="sort-by"
    class="custom-select"
  >
    <option value="">Select</option>
    <option value="cheapest">Cheapest</option>
    <option value="mostExpensive">Most Expensive</option>

    <option value="date">Date</option>
  </select>
  </div>
</div>
<ul class="order-list">
    <li v-for="order in filterObjects" :key="order.orderId" class="order-orderd">
      <div class="order-orderd-container">

      <div class="order-container"><router-link :to="'/display/' + order.idUser">
  <h2 class="name">{{ order.userName }} {{ order.surname }}</h2>
</router-link>

        <img :src="order.logo" class="order-logo" alt="Logo" />

        <p class="labels2"> Date 📅: {{ order.date }} </p>

        <p class="labels2"> Duration ⌛: {{ order.duration }} </p>
        <p class="labels2"> Final Price 💸: {{ order.price }} </p>
        <p :class="['orderStatus', order.orderStatus.toLowerCase() === 'approved' ? 'approved' : order.orderStatus.toLowerCase() === 'picked-up' ? 'picked-up' : order.orderStatus.toLowerCase() === 'returned' ? 'returned' : order.orderStatus.toLowerCase() === 'rejected' ? 'rejected' : 'canceled']">
Status: {{ order.orderStatus.toLowerCase() === 'approved' ? 'Approved' : order.orderStatus.toLowerCase() === 'picked-up' ? 'Picked Up' : order.orderStatus.toLowerCase() === 'returned' ? 'Returned' : order.orderStatus.toLowerCase() === 'rejected' ? 'Rejected' : 'Canceled' }}
</p>

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
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar.vue";
import OrderCard from "./OrderCard.vue";

export default {
  components: {
    navBar: Navbar,
    OrderCard: OrderCard
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        image:"",
      },
      orders: [],
      search: "",
      selectedSortField: "",
      IsBuyer:false,
      IsManager:false,
      name:"",
      rentalId:0

    };
  },

  methods: {
    matchPriceRange: function(price, searchValue) {
      const priceRangeRegex = /\d+\s*-\s*\d+/; // Pattern for price range like "10 - 20"
      const searchRegex = new RegExp(searchValue, "i");

      if (priceRangeRegex.test(searchValue)) {
        const [minPrice, maxPrice] = searchValue
          .split("-")
          .map(value => value.trim());
        return (
          Number(price) >= Number(minPrice) && Number(price) <= Number(maxPrice)
        );
      }

    return price.match(searchRegex);
  },
  matchDateRange: function(date, searchValue) {
  const dateRangeRegex = /\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}/; // Pattern for date range like "2023-07-05 - 2023-07-09"
  const searchRegex = new RegExp(searchValue, "i");

  if (dateRangeRegex.test(searchValue)) {
    const [startDate, endDate] = searchValue.split(" - ").map(value => value.trim());
    const currentDate = new Date(date);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return currentDate >= startDateObj && currentDate <= endDateObj;
  }

  return searchRegex.test(date);
}











,
    submitForm() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .put(`http://localhost:8081/users/${decoded.id}`, this.form)
        .then(response => {
          this.$toastr.s("Successfully updated!");
          this.$forceUpdate();
        })
        .catch(error => {
          this.$toastr.e("This username already exists!");
        });
    },
    getUserData() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .get(`http://localhost:8081/users/${decoded.id}`)
        .then(response => {
          this.form = response.data;
        })

        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching user data");
        });
    },
    sortByField(orders, field) {
      return orders.sort((order1, order2) => {
        const field1 = order1[field];
        const field2 = order2[field];

        if (field === "price") {
          const price1 = parseFloat(field1);
          const price2 = parseFloat(field2);

          return price1 - price2;
        } else if (field === "date") {
          const date1 = new Date(field1);
          const date2 = new Date(field2);

          return date1 - date2;
        } else if (field === "cheapest") {
          const price1 = parseFloat(order1.price);
          const price2 = parseFloat(order2.price);

          return price1 - price2;
        } else if (field === "mostExpensive") {
          const price1 = parseFloat(order1.price);
          const price2 = parseFloat(order2.price);

          return price2 - price1;
        } else {
          if (field1 < field2) {
            return -1;
          } else if (field1 > field2) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    },

    checkIfBuyer() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      if (decoded.role == "Buyer") {
        this.IsBuyer = true;
      }
    else if(decoded.role =="Manager"){
        this.IsManager=true;
    }    }
  },
  mounted() {
    this.getUserData();
    this.checkIfBuyer()
    ;
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    console.log(decoded)
    axios
        .get(`http://localhost:8081/orders/${decoded.id}`)
        .then(response => {
          this.orders = response.data; 
          this.name=this.orders[0].name;
          this.rentalId=this.orders[0].rentalId;
          console.log(this.rentalId);

        })
        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching orders data");
        });
    },
    computed: {
   
      filterObjects: function() {
  const searchValues = this.search.split(",").map(value => value.trim());

  const filteredOrders = this.orders.filter(order => {
    let matchesSearch = true;

    for (const searchValue of searchValues) {
      if (searchValue) {
        const searchRegex = new RegExp(searchValue, "i");

        const matchesName = order.name.match(searchRegex);
        const matchesDate = this.matchDateRange(order.date, searchValue);
        const matchesPrice = this.matchPriceRange(order.price, searchValue);

        matchesSearch =
          matchesSearch &&
          (matchesName || matchesDate || matchesPrice);
      }
    }

    return matchesSearch;
  });

  if (this.selectedSortField) {
    this.sortByField(filteredOrders, this.selectedSortField);
  }

  return filteredOrders;
}
    }
  
  
};
</script>

<style scoped>
.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  display: flex;
  justify-content: space-between;
  gap: 1em;
  flex-direction: row;
  background-position: center;
  padding: 40px;
}
.register-form {
  height: min-content;
  flex-grow: 2;
  padding: 30px;
  background-color: #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: rgba(122, 136, 220, 0.2);
  width: 18%;
  margin: 0 auto;
  border: 1px solid #ccc; /* Updated border style */
  border-width: 2px; /* Increased border width */
  border-style: solid; /* Added border style */
  border-radius: 10px; /* Increased border radius */
}


.register-form h2 {
  text-align: center;
  font-size: 35px;
  color:#fff;
}

.displayOrder {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 3;
  gap: 5rem;
  padding: 10px;
}

.register-form .form-group {
  margin-bottom: 20px;
}

.register-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.register-form input[type="text"],
.register-form input[type="password"],
.register-form select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.register-form button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: lightslategray;
  color: #fff;
  border: none;
}

.register-form button:hover {
  background-color: #45a049;
  cursor: pointer;
}

.name:hover{
  color: darkblue;
}
.changeName:hover{
  color: darkblue;
  font-size: 40px;
}

.order-list {
  list-style: none;
  display: flex;
  max-width: 102%;
  padding: 10px;
  flex-direction: column;
  gap: 20px;
}

.order-orderd {
  gap: 20rem;
  flex-wrap: wrap;
  background-color: rgba(
    242,
    242,
    242,
    0.7
  ); /* Promenjen kod za postavljanje transparentnosti */
  padding: 20px;
  border-radius: 5px;
}

.order-orderd-container {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
  align-items: center;
}

.order-container {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc; /* Dodat border sa bojom #ccc */
  border-radius: 5px; /* Dodat border-radius za blago zaobljen izgled */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Dodat box-shadow efekat */
  padding: 20px; /* Dodat padding za unutrašnji prostor */
  background-color: rgba(
    26,
    101,
    141,
    0.1
  ); /* Promenjen kod za postavljanje transparentnosti */
}

.order-container:hover {
  transform: scale(1.1);
  background-color: rgba(
    142,
    194,
    220,
    0.8
  ); /* Promenjen kod za postavljanje transparentnosti */
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
  background-color: rgba(
    144,
    15,
    15,
    0
  ); /* Promenjen kod za postavljanje transparentnosti */
}

.vehicle-scroll {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 250px; /* Adjust the max height as desired */
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

.title-container {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: rgb(198, 226, 244); /* Crvena boja - možete promeniti u željenu boju */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Efekat senke na naslov */
}

.filter-box {
  display: flex;
  align-items: center;
}

.filter-box label {
  margin-right: 5px;
}

.custom-select {
  padding: 5px;
  border-radius: 3px;
}

.labels2 {
  font-size: 15px;
  color: rgb(12, 75, 79);
  padding: 6px;
  margin-left: 8px;
  align-items: flex-end;
  font-family: "Lato", Arial, sans-serif;
  text-align: center;
}

.order-logo {
  width: 45%;
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

p.orderStatus {
  font-weight: bold;
  font-size: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  padding: 3px;
  border-radius: 20px; /* Promenjeno na 20px */
  text-align: center;
}

p.orderStatus.approved {
  background-color: #28a745;
}

p.orderStatus.rejected {
  background-color: #dc3545;
}
p.orderStatus.canceled {
  background-color: #dc3545;
}

.name {
  font-size: 25px;
  color: rgb(15, 132, 182);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  transition: color 0.3s ease;
  align-self: center;
  text-align: center;
}

.image-manager {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>
