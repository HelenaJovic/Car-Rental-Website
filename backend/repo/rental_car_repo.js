const path = "./data/cars_rental.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");

function create(car_rental) {
  const cars_rental = json_utils.jsonReader(path);
  car_rental.id = json_utils.generateNextId(cars_rental);
  console.log(car_rental);
  console.log("aca konj");
  cars_rental.push(car_rental);
  json_utils.saveDataToFile(cars_rental, path);
}

function findIndex(cars_rental, id) {
  return cars_rental.findIndex(car_rental => car_rental.id === parseInt(id));
}


function update(id, updatedCar) {
  const cars_rental = json_utils.jsonReader(path);
  const index = findIndex(cars_rental, id);
  
  if (index !== -1) {
    for (let prop in updatedCar) {
      if (cars_rental[index].hasOwnProperty(prop)) {
        cars_rental[index][prop] = updatedCar[prop];
      }
    }

    cars_rental[index].id = parseInt(id, 10);
    json_utils.saveDataToFile(cars_rental, path);

    return cars_rental[index];
  }

  return null; 
}


function remove(id) {
  const cars_rental = json_utils.jsonReader(path);
  const index = findIndex(cars_rental, id);

  if (index !== -1) {
    const removedCar = cars_rental.splice(index, 1)[0]; // Remove the user at the specified index
    json_utils.saveDataToFile(cars_rental, path);
    return removedCar;
  } else {
    throw new Error("Car not found");
  }
}


function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const cars_rental = json_utils.jsonReader(path);
  index = findIndex(cars_rental, id);

  return cars_rental[index];
}

module.exports = { create, update, remove, getAll, getById };
