<template>
    <div class="rent-a-car-card">
        <div class="img-div">
            <div class="row-div">
      <img src="../assets/images/aaaa.png" class="car-img"/>
      <h3>{{car.name}}</h3>
    </div>
      <div>
        <h3>Location:📍 {{car.location }}</h3>
    </div>
    </div>
    <div class="bottom-div">
<h3>Grade⭐: {{car.grade }}</h3>
    </div>
    </div>
  </template>
  
  <script>
  import 'regenerator-runtime/runtime';

  export default {
    name: 'RentACarCard',
  props: ['car'],
  methods:{
    getImage(){
      return require(this.car.path)
    }
  }
  };
  
  </script>
  
  <style scoped>
  .rent-a-car-card {
    width: 100%;
    height: 23rem;
    border: 1px black solid;
    border-radius:5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  }

  .rent-a-car-card:hover {
    transform: scale(1.1);
  }
  
  .row-div{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  .img-div{
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .car-img{
    width: 6rem;
    height: 6rem;
  }
.bottom-div{
    display: flex;
    justify-content: flex-end;
}

  </style>
  