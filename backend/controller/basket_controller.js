const express = require("express");
const router = express.Router();
const basketService = require("../service/basket_service");
const { json } = require("body-parser");

router.use(express.json());

router.delete("/deleteVehicle/:userId/:vehicleId", (req, res) => {
  const userId = req.params.userId;
  const vehicleId = parseInt(req.params.vehicleId, 10);
  console.log(vehicleId);

  var basket = basketService.getByUserId(userId);
  try {
    if (!basket) {
      return res.status(404).json({ error: "Basket can not find." });
    }

    const vehicleIndex = basket.vehicles.findIndex((v) => v.id === vehicleId);

    if (vehicleIndex === -1) {
      return res
        .status(404)
        .json({ message: "Vehicle not found in the basket." });
    }

    basketService.deleteVehicleFromBasket(basket, vehicleId);

    basketService.update(basket.id, basket);
    res
      .status(200)
      .json({ message: "Vehicle removed successfully from the basket." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while removing the vehicle from the basket.",
    });
  }
});

router.post("/updatePrice/:userId", (req, res) => {
  const userId = req.params.userId;
  const newPrice = req.body.price;

  try {
    var basket = basketService.getByUserId(userId);
    console.log(basket);

    if (!basket) {
      return res.status(404).json({ error: "Basket can not find." });
    }

    basket.price = newPrice;

    basketService.update(basket.id, basket);
    return res.status(200).json({ message: "Price successfully updated." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Došlo je do greške na serveru." });
  }
});

router.get("/", (req, res) => {
  res.json(basketService.getAll());
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    var basket = basketService.getByUserId(userId);

    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:idUser", (req, res) => {
  const cartData = req.body;
  const userId = req.params.idUser;
  try {
    const updatedCart = basketService.addToCart(userId, cartData);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to create basket" });
  }
});

router.put("/:id", (req, res) => {
  const basketId = req.params.id;
  const updatedData = req.body;

  const updatedBasket = basketService.update(basketId, updatedData);

  if (!updatedBasket) {
    return res.status(404).json({ error: "Basket not found" });
  }

  res.json(updatedBasket);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var basket = basketService.getById(id);

    if (basket) {
      basketService.remove(id);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Basket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var basket = basketService.getById(id);

    res.status(200).json(basket);
  } catch (error) {
    res.status(404).json({ error: "Basket not found" });
  }
});

module.exports = router;
