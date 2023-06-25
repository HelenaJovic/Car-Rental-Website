const vehicleRepo = require("../repo/vehicle_repo");
const rental_car_service=require("../service/rental_car_service")

function create(vehicle,id) {
  const savedVehicle = vehicleRepo.create(vehicle)
  rental_car_service.addNewCar(id,savedVehicle);
 return savedVehicle;
}

function remove(id,idCar) {
  return rental_car_service.deleteNewCar(id,idCar);
  return vehicleRepo.remove(id);
}

function getAll() {
  return vehicleRepo.getAll();
}


function getById(id) {
  return vehicleRepo.getById(id);
}

function update(id, updatedVehicle,idCar) {
  const savedVehicle= vehicleRepo.update(id, updatedVehicle);
  rental_car_service.updateNewCar(id,savedVehicle,idCar);
  return savedVehicle;

}

module.exports = { create, remove, getAll, getById, update };
