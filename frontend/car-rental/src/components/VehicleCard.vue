<template>
  <div class="vehicle-card">
    <div class="grid-item-1">
      <img :src="vehicle.image" class="vehicle-img" />
    </div>

    <div class="grid-item-2">
      <div class="grid-item-2-1">
        <h2 class="naslov">{{ vehicle.brand }}</h2>

        <h2 class="naslov">{{ vehicle.model }}</h2>
      </div>
      <div class="grid-item-2-2">
        <img src="../assets/images/manual.png" class="icons" />
        <p class="paragraph">{{ vehicle.transType }}</p>
        <img src="../assets/images/people.png" class="icons" />
        <p class="paragraph">{{ vehicle.peopleNum }}</p>
        <img src="../assets/images/doors.png" class="icons" />
        <p class="paragraph">{{ vehicle.doorsNum }}</p>
      </div>

      <div class="grid-item-2-3">
        <label class="labels">Vehicle type:</label>
        <p class="paragraph1">{{ vehicle.vehicleType }}</p>
        <label class="labels">Fuel type:</label>
        <p class="paragraph1">{{ vehicle.fuelType }}</p>
      </div>

      <div class="grid-item-2-4">
        <label class="labels">Consumption:</label>
        <p class="paragraph1">{{ vehicle.consumption }}</p>
      </div>

      <div class="grid-item-2-5">
        <label class="labels2">Price:</label>
        <p class="paragraph2">{{ vehicle.price }}</p>
        <button type="submit" v-on:click.prevent="updateCar(vehicle.id,rentalCarId)">
          Update
        </button>
        <button type="submit" v-on:click.prevent="deleteCar(vehicle.id,rentalCarId)">
          Delete
        </button>
 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleCard",
  props: ["vehicle", "deleteCar","rentalCarId","updateCar"]
};
</script>
<style scoped>
.vehicle-card {
  width: 100%;
  height: 20rem;
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  justify-content: stretch;
  align-content: center;

  grid-gap: 20px;

  box-shadow: 0px 2px 6px rgba(82, 42, 8, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: rgba(242, 237, 230, 0.8);
}

.grid-item-1 {
  display: flex;
  align-items: flex-start;
}

.grid-item-2 {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
}

.vehicle-img {
  width: 20rem;
  height: 16rem;
  align-items: center;
}

.icons {
  width: 2rem;
  height: 2rem;
  margin: 7px;
}

.naslov {
  padding: 8px;
  font-size: 26px;
}

.paragraph {
  padding: 4px;
  font-size: 21px;
  color: rgb(12, 75, 79);
}

.paragraph1 {
  padding: 4px;
  font-weight: bold;
  font-size: 21px;
  color: rgb(12, 75, 79);
}
.labels {
  font-size: 21px;
  color: rgb(12, 75, 79);
  padding: 5px;
}

.labels2 {
  font-size: 24px;
  color: rgb(12, 75, 79);
  padding: 6px;
  margin-left: 8px;
  align-items: flex-end;
  font-family: "Lato", Arial, sans-serif;
}

.paragraph2 {
  font-family: "Montserrat", Arial, sans-serif;
  padding: 4px;
  font-weight: bold;
  font-size: 24px;
  color: rgb(12, 75, 79);
  align-items: flex-end;
}
.grid-item-2-1 {
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: row;
}

.grid-item-2-2 {
  grid-row-start: 2;
  grid-row-end: 3;
  display: flex;
  flex-direction: row;
}

.grid-item-2-3 {
  grid-row-start: 3;
  grid-row-end: 4;
  display: flex;
  flex-direction: row;
}

.grid-item-2-4 {
  grid-row-start: 4;
  grid-row-end: 5;
  display: flex;
  flex-direction: row;
}

.grid-item-2-5 {
  grid-row-start: 5;
  grid-row-end: 6;
  display: flex;
  gap: 1rem;
  flex-direction: row;
}

.vehicle-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

button {
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  height: 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
