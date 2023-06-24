const express = require("express");
const router = express.Router();
const vehicleService = require("../service/vehicle_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(vehicleService.getAll());

});

router.post("/:id", (req, res) => {
  const vehicle = req.body;
  const id = req.params.id;
  try {
    vehicleService.create(vehicle,id);
    res.status(200).json({ message: "vehicle created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create  vehicle" });
  }
});

router.put("/:id", (req, res) => {

  const vehicleId = req.params.id;
  const updatedData = req.body; 
  console.log(updatedData);
  const updatedVehicle = vehicleService.update(vehicleId, updatedData);

  if (!updatedVehicle) {
    return res.status(404).json({ error: "vehicle not found" });
  }

  
  res.json(updatedVehicle);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var vehicle = vehicleService.getById(id);

    if (vehicle) {
      // Delete the user
      vehicleService.remove(id);
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: "vehicle not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var vehicle = vehicleService.getById(id);
    console.log(vehicle);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ error: "vehicle not found" });
  }
});

module.exports = router;
