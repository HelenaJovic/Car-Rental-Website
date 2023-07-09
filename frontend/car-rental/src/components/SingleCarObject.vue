<template>
  <div>
    <navBar></navBar>

    <div class="main-container">
      <!-- Prva vrsta -->
      <div class="rent-a-car-container">
      <div class="grid-item-1">
        <div class="flex-item">
          <h2>{{ carObject.name }}</h2>
          <img :src="carObject.imagePath" class="car-logo" alt="Car Logo" />

          <p>Working hours: {{ carObject.workHoursStart }}-{{carObject.workHoursEnd }}</p>

          <p>Location: {{ carObject.location.adress }}</p>

          <p v-if="carObject.grade">Average grade: {{ carObject.grade }}</p>
          <p :class="['status', carObject.status ? 'opened' : 'closed']">
  Status: {{ carObject.status ? 'Opened' : 'Closed' }}
</p>

          <button class="form-group" type="button" v-on:click="addVehicle(carObject.id)" v-if="isManager">Add Vehicle</button>
        </div>
      </div>
      <div class="grid-item-2">
        <vehicleCard
          v-for="vehicle in carObject.vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          :rental-car-id="id"
          :update-car="updateCar"
          :delete-car="deleteCar"
          :is-manager="isManager"
        ></vehicleCard>
      </div>
    </div>
  
  <div class="second-row">
  <div class="comment-header">
    <h2>Comments</h2>
  </div>
  <div class="comment-list-container">

  <ul class="comment-list" v-if="comments.length>0">
    <li v-for="comment in comments" :key="comment.commentId" class="comment-container">
      <div class="list-part">
      <div class="user-info">
        <img :src="comment.logo" alt="User Logo" class="user-logo">
        <span>{{ comment.userName }} {{ comment.surname }}</span>
      </div>
      <p>{{ comment.text }}</p>
      <p class="button1" v-if="parseInt(comment.grade) === 1">⭐</p>
<p class="button1" v-if="parseInt(comment.grade) === 2">⭐⭐</p>
<p class="button1" v-if="parseInt(comment.grade) === 3">⭐⭐⭐</p>
<p class="button1" v-if="parseInt(comment.grade) === 4">⭐⭐⭐⭐</p>
<p class="button1" v-if="parseInt(comment.grade) === 5">⭐⭐⭐⭐⭐</p>

</div>
    </li>
  </ul>
  <p class="noComments" v-if="comments.length===0">There are no comments yet for this rental object!




</p>
</div>

</div>

</div>

  </div>
</template>


<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import VehicleCard from "./VehicleCard.vue";
import jwt_decode from "jwt-decode";


export default {
  components: {
    navBar: Navbar,
      vehicleCard: VehicleCard

  },
  data() {
    return {
      id: this.$route.params.id,
      isManager:false,
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
        vehicles: [],
       
      },
      comments:[]
    };
  },
  methods: {
    addVehicle(id) {
      this.$router.push({ path: "/vehicle/" + id });
    },
    
    deleteCar(vehicleId,id) {
      
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
  const token = localStorage.getItem("token");

  // Provera da li postoji token
  if (token) {
    const decoded = jwt_decode(token);
    axios.get(`http://localhost:8081/cars/Allcomments/${this.id}/${decoded.role}`)
          .then(response => {
            this.comments = response.data;
            console.log(this.comments)
          })
          .catch(error => {
            console.error(error);
            window.alert("An error occurred while fetching orders data");
          });

    axios
      .get(`http://localhost:8081/cars/manager/${this.id}/${decoded.id}`)
      .then(response => {
        this.isManager = response.data.isManager;
        console.log(this.isManager);
      })
      .catch(error => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });

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
  else{
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
}

};
</script>

<style scoped>
.rent-a-car-container {
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  padding: 10px;
}

.helping-container {
  padding: 20px;
}

.main-container {
  display: flex;
  background-image: url("../assets/images/auto.jpg");
  background-size: cover;
  background-position: center;
  gap:0.5rem;
  flex-direction: column;
  justify-content: space-between; /* Koristimo space-between kako bismo razdvojili prvu i drugu vrstu */
  height: 100%; /* Dodajemo visinu 100% kako bi popunili preostali prostor */
}

.grid-item-1 {
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 20px;
}

.grid-item-2 {
  grid-row: 1/3;
  padding: 20px;
  border: 1px solid #e0e0e0;
  max-height: 89vh; /* Dodali smo ograničenje visine */
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  grid-gap: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.second-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 20px;
  padding: 10px;


}
.comment-list-container {
  height: 300px; /* Postavite visinu prema potrebama */
  width: 80%;
  overflow-y: auto;
}
.comment-list::-webkit-scrollbar {
  width: 10px; /* Širina scrollbar-a */
}

.comment-list::-webkit-scrollbar-track {
  background: #f1f1f1; /* Boja pozadine track-a */
}

.comment-list::-webkit-scrollbar-thumb {
  background: #888; /* Boja thumb-a */
}

.comment-list::-webkit-scrollbar-thumb:hover {
  background: #555; /* Boja thumb-a prilikom hover-a */
}

.comment-list {
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin-top: 20px; 
  gap: 1rem;
  background-color: transparent; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.flex-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
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
.comment-header {
  display: flex;
  background-image: url(../assets/images/back10.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  width: 98%;
  margin-bottom: 20px;
  border-radius: 10px; /* Dodajte zaobljene ivice */
}
.comment-header h2 {
  margin: 0;
  color: rgb(241, 245, 247);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.list-part{
  background-image: url(../assets/images/back3.jpg);
  background-size: cover;
  background-position: center;
  padding: 10px;
  border-radius: 10px; /* Dodajte zaobljene ivice */

}


.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info span {
  font-weight: bold;
  font-size: 20px;

}

.button1{
  font-size: 20px;
}

.noComments{
  font-size: 40px;
  align-items: center;
  text-align: center;
  color: #ad3421;
}
</style>
