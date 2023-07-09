import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router/routes";
import VueToastr from "vue-toastr";
import VueGeolocation from "vue-browser-geolocation";

Vue.use(VueRouter);
Vue.use(VueToastr, {});
Vue.use(VueGeolocation);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyApVpG0P_OqhiAknz_nX9Q2p9dQSJuDJk8"
  },
  installComponents: false
});

Vue.component("google-map", VueGoogleMaps.Map);

export const eventBus = new Vue();

const router = new VueRouter({
  mode: "history",
  routes: Routes
});

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
