<template>
  <div class="cartItem-card">
    <div class="image-container">
      <img :src="vehicle.image" class="image" />
    </div>
    <div class="data-container">
      <div class="vehicle-name">
        <p class="paragraph">{{ vehicle.brand }}</p>
        <p class="paragraph">{{ vehicle.model }}</p>
      </div>
      <div class="helping-container">
        <label class="labele">Price:</label>
        <p class="paragraph">{{ vehicle.ukupna }}</p>
      </div>
    </div>

    <div class="button-container">
      <button
        type="submit"
        class="button"
        @click.prevent="vehicleMethods.decrease(vehicle)"
      >
        ➖
      </button>
      <p class="paragraph">{{ vehicle.counter }}</p>
      <button
        type="submit"
        class="button"
        @click.prevent="vehicleMethods.increase(vehicle)"
      >
        ➕
      </button>

      <button
        typa="submit"
        v-on:click.prevent="vehicleMethods.remove(vehicle)"
        class="button1"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    vehicle: {
      type: Object,
      required: true
    },
    vehicleMethods: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
.cartItem-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: rgba(122, 136, 220, 0.4);
  gap: 20px;
  width: 300px;
  height: 300px;
}

.image-container {
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 20px 20px 0px 20px;
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.1);
}
.image {
  height: 150px;
  width: 150px;
  align-self: center;
}

.button1 {
  padding: 0.5rem 1rem;
  background-color: #266fc2;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 2px 0px 2px 70px;
}
.data-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button1:hover {
  transform: scale(1.1);
}

.vehicle-name {
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 20px;
  gap: 5px;
  align-self: flex-start;
}

.paragraph {
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
}

.helping-container {
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 5px;
  padding: 0px 20px 0px 0px;
}

.labele {
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
}

.button-container {
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 20px;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 20px 10px 20px;
}

.button {
  font-size: 18px;
}
</style>
