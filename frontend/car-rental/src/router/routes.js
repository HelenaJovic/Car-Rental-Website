import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

export default [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/login", component: Login }
];
