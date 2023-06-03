const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

router.use(express.json());

router.get("/", (req, res) => {
  res.json(userService.getAll());
});

router.post("/", (req, res) => {
  const user = req.body;

  try {
    userService.create(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var user = userService.getById(id);
    res.status(200).json(userService.getById(id));
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  var user = userService.getByUsername(username);

  if (user && user.password == password) {
    const token = jwt.sign(
      { username: user.username, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      secretKey
    );

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

module.exports = router;
