const express = require("express");
const router = express.Router();
const rentalCarService = require("../service/rental_car_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(rentalCarService.getAll());
});

router.get("/sortedCars", (req, res) => {
  res.json(rentalCarService.getSortedCarsByStatus());
});



router.post("/", (req, res) => {
  const car = req.body;
  try {
    rentalCarService.create(car);
    res.status(200).json({ message: "Car created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create rental car" });
  }
});

router.put("/:id", (req, res) => {
  const carId = req.params.id;
  const updatedData = req.body; 
  const updatedCar = rentalCarService.update(carId, updatedData);

  if (!updatedCar) {
    return res.status(404).json({ error: "Car not found" });
  }

  res.json(updatedCar);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var car = rentalCarService.getById(id);

    if (car) {
      // Delete the user
      rentalCarService.remove(id);
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var car = rentalCarService.getById(id);
    console.log(car);
    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ error: "Car not found" });
  }
});

module.exports = router;
