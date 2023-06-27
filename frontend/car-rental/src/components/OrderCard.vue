<template>
    <div class="vehicle-card">
      <div class="grid-item-1">
        <img :src="vehicle.image" class="vehicle-img" />
      </div>
  
        <div class="grid-item-2-1">
          <h2 class="naslov">{{ vehicle.brand }}</h2>
  
          <h2 class="naslov">{{ vehicle.model }}</h2>
        </div>
  
        <div class="grid-item-2-5">
          <label class="labels2">💰:</label>
          <p class="paragraph2">{{ vehicle.price }}</p>
          
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VehicleCard",
    props: ["vehicle"]
  };
  </script>
  <style scoped>
  .vehicle-card {
    width: 40%;
    height: 14rem;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
  
    justify-content: center;
    gap: 1px;
    flex-direction: column;
  
    box-shadow: 0px 2px 6px rgba(82, 42, 8, 0.3);
    transition: transform 0.3s ease;
    cursor: pointer;
    background-color: rgba(135, 206, 250, 0.2); /* Svetloplava boja sa 70% neprozirnosti */
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
    width: 10rem;
    height: 10rem;
  }
  
  .icons {
    width: 2rem;
    height: 2rem;
    margin: 7px;
  }
  
  .naslov {
    padding: 3px;
    font-size: 20px;
    align-items: center;
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
    font-size: 15px;
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
    font-size: 15px;
    color: rgb(12, 75, 79);
    align-items: flex-end;
  }
  .grid-item-2-1 {
    display: flex;
    flex-direction: row;
  }
  
 
  .grid-item-2-5 {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: center;
  }
  
  .vehicle-card:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  </style>
  