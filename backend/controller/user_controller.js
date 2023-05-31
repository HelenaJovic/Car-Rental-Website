const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");

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

module.exports = router;
