const express = require("express");
const cors = require("cors");
const userController = require("./controller/user_controller");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use("/users", userController);
//console.log(userService.getById(1)); samo provera da li radi getById
app.listen(8081, () => console.log("Server running!"));
