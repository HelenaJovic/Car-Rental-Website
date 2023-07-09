const path = "./data/cars_rental.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");
const userRepo=require("../repo/user_repo");


function create(car_rental) {
  const cars_rental = json_utils.jsonReader(path);
  car_rental.id = json_utils.generateNextId(cars_rental);

  cars_rental.push(car_rental);
  json_utils.saveDataToFile(cars_rental, path);
  return car_rental.id;
}
function IsManager(idRental,idUser)
{
  const user=userRepo.getById(idUser);

  console.log(user.rentalObject)

  if(user.rentalObject!=null && user.rentalObject==idRental)
  {
    return true;
  }
  return false;
}












function findIndex(cars_rental, id) {
  return cars_rental.findIndex((car_rental) => car_rental.id === parseInt(id));
}




function update(id, updatedCar) {
  const cars = json_utils.jsonReader(path);

  index = findIndex(cars, id);

  cars[index] = updatedCar;


  json_utils.saveDataToFile(cars, path);

  return cars[index];
}
function updateNewCar(updatedVehicle, idCar) {
  const rentalCar = getById(idCar);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === updatedVehicle.id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    rentalCar.vehicles[index] = updatedVehicle;
    update(idCar, rentalCar);
  }
}

function remove(id) {
  const cars_rental = json_utils.jsonReader(path);
  const index = findIndex(cars_rental, id);

  if (index !== -1) {
    const removedCar = cars_rental.splice(index, 1)[0]; 
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
function getAllVehicles(id) {
  const car_object = getById(id);

  return car_object.vehicles;
}

function deleteNewCar(id,idCar)
{
  const rentalCar = getById(idCar);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    rentalCar.vehicles.splice(index, 1);
    update(idCar, rentalCar);
  }
  
}
function addNewCar(id,vehicle)
{
  const rentalCar=getById(id);
  rentalCar.vehicles.push(vehicle);
  update(id,rentalCar);
  
}

module.exports = { create, update,addNewCar, updateNewCar,remove,deleteNewCar, getAll, getById,getAllVehicles,IsManager};
