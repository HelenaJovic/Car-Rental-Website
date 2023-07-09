const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

router.use(express.json());



router.get("/usersForAdmin/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  res.json(userService.getUsersForAdmin(userId));
});



router.get("/managers", (req, res) => {
  res.json(userService.getAvailableManagers());
});

router.get("/", (req, res) => {
  res.json(userService.getAll());
});



router.put('/increaseCounter/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log("user id  je"+userId)
  try {
    userService.increaseCounter(userId);

    res.status(200).json({ message: 'Counter increased successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while increasing the counter' });
  }
});

router.put("/:id/:rentalObjectId", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const rentalObjectId = parseInt(req.params.rentalObjectId, 10);

  const updateManager = userService.updateManager(userId, rentalObjectId);

  res.json(updateManager);
});

router.put('/isBlockedUser/user/:userId', (req, res) => {
  console.log("aaaaaaa")
  const userId = req.params.userId;
  console.log(userId)
  try {
    userService.changeIfBlocked(userId);
    res.status(200).json({ message: 'Blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while blocking user' });
  }
});



router.post("/", (req, res) => {
  const user = req.body;

  if (userService.getByUsername(user.username)) {
    res.status(409).json({ error: "Username already exists!" });
    return;
  }

  try {
    userService.create(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/updatePoints/:userId", (req, res) => {
  const userId = req.params.userId;
  const newPoints = req.body.points;
  try {
    var user = userService.getById(userId);

    if (user) {
      userService.updatePoints(user, newPoints);
      res.status(200).json({ message: "Sucessfully updated points." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update points" });
  }
});

router.post("/lostPoints/:userId", (req, res) => {
  const userId = req.params.userId;
  const newPoints = req.body.points;

  try {
    var user = userService.getById(userId);

    if (user) {
      user.points = user.points - newPoints / (100 * 133 * 4);
      if (user.points > 5 && user.points < 10) {
        (user.buyerType.name = "Silver"),
          (user.buyerType.discount = 10),
          (user.buyerType.points = 5);
      }

      if (user.points > 10) {
        (user.buyerType.name = "Gold"),
          (user.buyerType.discount = 15),
          (user.buyerType.points = 10);
      }

      if (user.points < 5) {
        (user.buyerType.name = "Bronze"),
          (user.buyerType.discount = 5),
          (user.buyerType.points = 0);
      }

      userService.update(user.id, user);
      res.status(200).json({ message: "Sucessfully updated points." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update points" });
  }
});

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  if (
    userService.getByUsername(updatedData.username) &&
    !(userService.getById(userId).username === updatedData.username)
  ) {
    res.status(409).json({ error: "Username already exists!" });
    return;
  }

  const updatedUser = userService.update(userId, updatedData);

  res.json(updatedUser);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var user = userService.getById(id);

    if (user) {
      // Delete the user
      userService.remove(id);
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var user = userService.getById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  var user = await userService.getByUsername(username);

  if (user && user.password == password) {
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secretKey
    );

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

module.exports = router;
