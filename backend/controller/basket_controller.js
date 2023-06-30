const express = require("express");
const router = express.Router();
const basketService = require("../service/basket_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(basketService.getAll());
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
