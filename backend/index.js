const express = require("express");
const userController = require("./controller/user_controller");

const app = express();

app.use("/users", userController);

app.listen(8080, () => console.log("Server running!"));
