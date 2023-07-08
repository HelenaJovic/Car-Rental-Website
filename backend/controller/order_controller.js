const express = require("express");
const router = express.Router();
const orderService = require("../service/order_service");

router.use(express.json());

router.get("/:idUser", (req, res) => {
  const id = parseInt(req.params.idUser, 10);

  res.json(orderService.getAllOrders(id));
});

router.post("/", (req, res) => {
  const order = req.body;
  try {
    orderService.create(order);
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create rental order" });
  }
});

router.put("/:id", (req, res) => {
  const orderId = req.params.id;
  const updatedData = req.body;
  const updatedOrder = orderService.update(orderId, updatedData);

  if (!updatedOrder) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(updatedOrder);
});

router.put("/approveOrder/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  var order = orderService.getById(orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  }

  order.orderStatus = "Approved";

  const updatedOrder = orderService.update(orderId, order);
  res.json(updatedOrder);
});

router.put("/cancelOrder/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  var order = orderService.getById(orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  }

  order.orderStatus = "Canceled";

  const updatedOrder = orderService.update(orderId, order);
  res.json(updatedOrder);
});

router.put("/rejectOrder/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const reason = req.body.reason;
  var order = orderService.getById(orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  }

  order.orderStatus = "Rejected";
  order.rejectionReason = reason;

  const updatedOrder = orderService.update(orderId, order);
  res.json(updatedOrder);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var order = orderService.getById(id);

    if (order) {
      // Delete the user
      orderService.remove(id);
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var order = orderService.getById(id);
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: "Order not found" });
  }
});

router.put("/takeOrder/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  var order = orderService.getById(orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  }

  const takenOrder = orderService.takeOrder(order);
  res.json(takenOrder);
});

router.put("/returnOrder/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  var order = orderService.getById(orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  }

  const returnedOrder = orderService.returnOrder(order);
  res.json(returnedOrder);
});

module.exports = router;
