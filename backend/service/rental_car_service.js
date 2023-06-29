const rentalCarRepo = require("../repo/rental_car_repo");
const orderService=require("../service/order_service");

function create(car_rental) {
  return rentalCarRepo.create(car_rental);
}

function remove(id) {
  return rentalCarRepo.remove(id);
}

function getAll() {
  return rentalCarRepo.getAll();
}

function getSortedCarsByStatus() {
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

function addNewCar(id,vehicle)
{
  const rentalCar=rentalCarRepo.getById(id);
  rentalCar.vehicles.push(vehicle);
  update(id,rentalCar);
  
}

function IsManager(idRental,idUser)
{
  return rentalCarRepo.IsManager(idRental,idUser);
}

function deleteNewCar(id,idCar)
{
  const rentalCar = rentalCarRepo.getById(idCar);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    rentalCar.vehicles.splice(index, 1);
    rentalCarRepo.update(idCar, rentalCar);
  }
  
}


function updateNewCar(id, updatedVehicle, idCar) {
  const rentalCar = rentalCarRepo.getById(idCar);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === updatedVehicle.id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    rentalCar.vehicles[index] = updatedVehicle;
    rentalCarRepo.update(idCar, rentalCar);
    //update(id, rentalCar, idCar);
  }
}



function getById(id) {
  return rentalCarRepo.getById(id);
}

function update(id, updatedCar) {
  return rentalCarRepo.update(id, updatedCar);
}

function getAllVehicles(id) {
  return rentalCarRepo.getAllVehicles(id);
}



module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getSortedCarsByStatus,
  getAllVehicles,

  addNewCar,
  updateNewCar,
  deleteNewCar,
  IsManager

};
