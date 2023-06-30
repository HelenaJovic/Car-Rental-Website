import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import UpdateUser from "../components/UpdateUser.vue";
import Login from "../components/Login.vue";
import YourProfile from "../components/YourProfile.vue";
import UpdateAddedCar from "../components/UpdateCar.vue";
import SingleCarObject from "../components/SingleCarObject.vue";
import MakeOrder from "../components/MakeOrder.vue";
import VehicleForm from "../components/VehicleForm.vue";
import AddCarObject from "../components/AddCarObject.vue";
import RegisterManager from "../components/RegisterManager.vue";
import MakeOrderSingleObject from "../components/MakeOrderSingleObject.vue";

export default [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/display/:id", component: YourProfile },
  { path: "/updateUser", component: UpdateUser },
  { path: "/singleObject/:id", component: SingleCarObject },
  { path: "/vehicle/:id", component: VehicleForm },
  { path: "/updateCar/:id1/:id2", component: UpdateAddedCar },
  { path: "/addObject", component: AddCarObject },
  { path: "/registerManager", component: RegisterManager },
  { path: "/makeOrder", component: MakeOrder },
  { 
    path: "/makeOrderSingle/:id", 
    name: "makeOrderSingle", 
    component: MakeOrderSingleObject, 
    props: (route) => ({ 
      id: route.params.id.toString(),
      startDate: route.query.startDate,
      endDate: route.query.endDate
    }) 
  }
  
  
];
