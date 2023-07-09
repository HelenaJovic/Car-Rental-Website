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

router.put("/:idV/:idC", (req, res) => {

  const vehicleId = req.params.idV;
  const carId=req.params.idC;
  const updatedData = req.body; 
  const updatedVehicle = vehicleService.update(vehicleId, updatedData,carId);
  if (!updatedVehicle) {
    return res.status(404).json({ error: "vehicle not found" });
  }

  
  res.json(updatedVehicle);
});

router.delete("/:idV/:idC", (req, res) => {
  const vehicleId = parseInt(req.params.idV, 10);
  const carId=req.params.idC;
  console

  try {
    var vehicle = vehicleService.getById(vehicleId);

    if (vehicle) {
      // Delete the user
      vehicleService.remove(vehicleId,carId);
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
