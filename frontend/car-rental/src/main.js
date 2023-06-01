import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router/routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
