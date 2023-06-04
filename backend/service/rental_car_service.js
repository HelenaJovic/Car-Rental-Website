const rentalCarRepo = require("../repo/rental_car_repo");

function create(car_rental) {
 return rentalCarRepo.create(car_rental);
}

function remove(id) {
  return rentalCarRepo.remove(id);
}

function getAll() {
  return rentalCarRepo.getAll();
}

function getSortedCarsByStatus()
{
    const allCars = rentalCarRepo.getAll();

 allCars.sort((car1, car2) => {
  if (car1.status === true && car2.status !== true) {
    return -1; 
  } else if (car1.status !== true && car2.status === true) {
    return 1; 
  }
  return 0; 
});

return allCars;
}

function getById(id) {
  return rentalCarRepo.getById(id);
}

function update(id, updatedCar) {
  return rentalCarRepo.update(id, updatedCar);
}

module.exports = { create, remove, getAll, getById, update,getSortedCarsByStatus };
