import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import UpdateUser from "../components/UpdateUser.vue";

export default [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path:"/updateUser",component: UpdateUser}
];
