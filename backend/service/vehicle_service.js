const vehicleRepo = require("../repo/vehicle_repo");

function create(vehicle) {
 return vehicleRepo.create(vehicle);
}

function remove(id) {
  return vehicleRepo.remove(id);
}

function getAll() {
  return vehicleRepo.getAll();
}


function getById(id) {
  return vehicleRepo.getById(id);
}

function update(id, updatedCar) {
  return vehicleRepo.update(id, updatedCar);
}

module.exports = { create, remove, getAll, getById, update };
