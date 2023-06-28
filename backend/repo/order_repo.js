const path = "./data/orders.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");
const rentalRepo=require("../repo/rental_car_repo");
const userRepo=require("../repo/user_repo");

function create(order) {
  const orders = json_utils.jsonReader(path);
  order.id = json_utils.generateNextId(orders);
  console.log(order.id);
  orders.push(order);
  json_utils.saveDataToFile(orders, path);
  return order;
}

function findIndex(orders, id) {
  return orders.findIndex(order => order.id === parseInt(id));
}

function getDate(orderId) {
    const orders = json_utils.jsonReader(path);
    const index = findIndex(orders, orderId);
  
    if (index !== -1) {
      return orders[index].date;
    } else {
      throw new Error("Order not found");
    }
  }


  function getByRole(currentUserId) {
    const orders = getAll();
    const user=userRepo.getById(currentUserId);

  
    if (user.role === 'Buyer') {
      const buyerOrders = orders.filter(order => order.buyer === currentUserId);
      return buyerOrders;
    } else if (user.role === 'Manager') {
      const managerOrders = orders.filter(order => order.rentalObject === user.rentalObject);
      return managerOrders;
    } else {
      return [];
    }
  }
  

 
  function getAllVehicles(id) {
    const order = getById(id);
  
    return order.vehicles;
  }
  

  function getDuration(orderId) {
    const orders = json_utils.jsonReader(path);
    const index = findIndex(orders, orderId);
  
    if (index !== -1) {
      const order = orders[index];
      return order.duration;
    } else {
      throw new Error("Order not found");
    }
  }

  function getStatus(orderId) {
    const orders = json_utils.jsonReader(path);
    const order = orders.find(order => order.id === orderId);
    return order ? order.orderStatus : null;
  }
  
  function getPrice(orderId) {
    const orders = json_utils.jsonReader(path);
    const order = orders.find(order => order.id === orderId);
    return order ? order.price : null;
  }
  
  
  

function update(id, updatedVehicle) {
  const orders = json_utils.jsonReader(path);

  index = findIndex(orders, id);

  orders[index] = updatedVehicle;

  orders[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(orders, path);

  return orders[index];
}


function remove(id) {
  const orders = json_utils.jsonReader(path);
  const index = findIndex(orders, id);

  if (index !== -1) {
    const removedCar = orders.splice(index, 1)[0]; 
    json_utils.saveDataToFile(orders, path);
    return removedCar;
  } else {
    throw new Error("Vehicle not found");
  }
}


function getAll() {
  return json_utils.jsonReader(path);
}

function getRental(id) {
    const order = getById(id);
    const rentalId = order.rentalObject;
    const rentalObject = rentalRepo.getById(rentalId);
  
  
    return rentalObject;
  }

  function getUser(id) {
    const order = getById(id);

    const userId = order.buyer;
    const user = userRepo.getById(userId);
  
    
    return user;
  }

  
  

function getById(id) {
  const orders = json_utils.jsonReader(path);
  index = findIndex(orders, id);


  return orders[index];
}

module.exports = { create, update, remove, getAll, getById,getDate,getDuration,getPrice,getStatus,getAllVehicles,getRental,getByRole,getUser
};
