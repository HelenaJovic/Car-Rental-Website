const express = require("express");
const router = express.Router();
const rentalCarService = require("../service/rental_car_service");

router.use(express.json());


router.get('/Allcomments/:rentalId/:role', (req, res) => {
  const rentalId = req.params.rentalId;
  const role = req.params.role;

  console.log(role)

  try {
    const comments = rentalCarService.getAllCommentsByRentalId(rentalId, role);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: "Comment not found" });
  }
});



router.get("/", (req, res) => {
  res.json(rentalCarService.getAll());
});
router.get("/filtered/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    var rental = rentalCarService.getFreeRentalById(id, startDate, endDate);
    if (rental) {
      res.status(200).json(rental);
    } else {
      res.status(404).json({ error: "Rental not found or no available vehicles" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
})





router.get("/:startDate/:endDate",(req,res)=>{
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);
  res.json(rentalCarService.getFreeRentals(startDate,endDate));
})

router.get("/manager/:idRental/:idUser", (req, res) => {
  const idRental = req.params.idRental;
  const idUser = req.params.idUser;

  console.log(idRental)
  console.log(idUser)

  try {
    const isManager = rentalCarService.IsManager(idRental, idUser);
    console.log(isManager)
    res.status(200).json({ isManager });
  } catch (error) {
    res.status(500).json({ error: "Failed to check manager status" });
  }
});



router.get("/sortedCars", (req, res) => {
  res.json(rentalCarService.getSortedCarsByStatus());
});



router.post("/", (req, res) => {
  const car = req.body;
  try {
    const id = rentalCarService.create(car);
    res.status(200).json({ id: id });
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

    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ error: "Car not found" });
  }
});

;


module.exports = router;
