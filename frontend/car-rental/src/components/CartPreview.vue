<template>
  <div class="main-container">
    <navBar></navBar>

    <div>
      <p>Selected Start Date: {{ selectedStartDate }}</p>
      <p>Selected End Date: {{ selectedEndDate }}</p>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  components: {
    navBar: Navbar
  },

  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null
    };
  },

  created() {
    eventBus.$off("startDate");
    eventBus.$off("endDate");

    eventBus.$on("startDate", date => {
      this.selectedStartDate = date;
      //console.log(this.selectedStartDate);
    });
    eventBus.$on("endDate", date => {
      this.selectedEndDate = date;
      //console.log(this.selectedEndDate);
    });
  },

  methods: {}
};
</script>
<style scoped></style>
