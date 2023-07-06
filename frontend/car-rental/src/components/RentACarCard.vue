<template>
  <div class="rent-a-car-card">
    <div class="img-div">
      <div class="row-div">
        <img :src="car.imagePath" class="car-img" />
        <h3 class="name">{{ car.name }}</h3>
      </div>

      <div>
        <h4 class="location">Location:📍 {{ car.location.adress }}</h4>
      </div>
    </div>
    <div class="bottom-div">
      <router-link v-bind:to="'/singleObject/' + car.id">
        <h3 class="details">View details</h3>
      </router-link>
      <h4 class="grade">Grade⭐: {{ car.grade }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "RentACarCard",
  props: ["car"]
};
</script>
<style scoped>
.rent-a-car-card {
  width: 102%;
  height: 21rem;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: rgba(114, 180, 180, 0.5);
}

.rent-a-car-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

.row-div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.img-div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.car-img {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.bottom-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}



h3 {
  margin: 0;
  font-weight: bold;
}

.name {
  font-size: 1.8rem;
  color: rgb(38, 81, 125);
  font-family: "Arial", sans-serif;
}

.details {
  font-size: 1.2rem;
  color: #676363;
  transition: color 0.3s ease;
  margin-top: auto;
}

.location {
  font-size: 1.2rem;
  color: #f6f7f9; /* Tamnosiva boja */
  letter-spacing: 1px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.grade {
  font-size: 1.2rem;
  color: #f3f4f9; /* Plavkasta boja */
  font-style: italic;
  text-decoration:wavy;
  transition: color 0.3s ease;
}

.grade:hover {
  color: #1a237e; /* Tamnija nijansa plavkaste boje */
}



.details:hover {
  color: #000;
}



</style>
