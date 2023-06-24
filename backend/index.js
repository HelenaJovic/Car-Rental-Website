const express = require("express");
const cors = require("cors");
const userController = require("./controller/user_controller");
const carController= require("./controller/rental_car_controller");
const vehicleController=require("./controller/vehicle_controller");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use("/users", userController);
app.use("/cars",carController);
app.use("/vehicles",vehicleController);
app.listen(8081, () => console.log("Server running!"));
