const path = "./data/vehicles.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");

function create(vehicle) {
  const vehicles = json_utils.jsonReader(path);
  vehicle.id = json_utils.generateNextId(vehicles);
  console.log(vehicle.id);
  vehicles.push(vehicle);
  json_utils.saveDataToFile(vehicles, path);
  return vehicle;
}

function findIndex(vehicles, id) {
  return vehicles.findIndex(vehicle => vehicle.id === parseInt(id));
}


function update(id, updatedVehicle) {
  const vehicles = json_utils.jsonReader(path);

  index = findIndex(vehicles, id);

  vehicles[index] = updatedVehicle;

  vehicles[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(vehicles, path);

  return vehicles[index];
}


function remove(id) {
  const vehicles = json_utils.jsonReader(path);
  const index = findIndex(vehicles, id);

  if (index !== -1) {
    const removedCar = vehicles.splice(index, 1)[0]; 
    json_utils.saveDataToFile(vehicles, path);
    return removedCar;
  } else {
    throw new Error("Vehicle not found");
  }
}


function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const vehicles = json_utils.jsonReader(path);
  index = findIndex(vehicles, id);

  return vehicles[index];
}

module.exports = { create, update, remove, getAll, getById };
