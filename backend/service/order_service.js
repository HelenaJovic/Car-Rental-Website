const orderRepo = require("../repo/order_repo");
const orderDTO = require("../dto/orderDTO");
const userService = require("../service/user_service");
const vehicleService = require("../service/vehicle_service");

function create(order) {
  return orderRepo.create(order);
}

function remove(id) {
  return orderRepo.remove(id);
}

function getAllOrders(userId) {
  const orders = orderRepo.getByRole(userId);
  const loggedUser = userService.getById(userId);

  const response = orders.map((order) => {
    const orderDto = new orderDTO();
    orderDto.orderId = order.id;
    orderDto.date = orderRepo.getDate(order.id);
    orderDto.price = orderRepo.getPrice(order.id);
    orderDto.orderStatus = orderRepo.getStatus(order.id);
    orderDto.duration = orderRepo.getDuration(order.id);
    orderDto.vehicles = order.vehicles;
    const user = orderRepo.getUser(order.id);
    const rentalObject = orderRepo.getRental(order.id);
    orderDto.rentalId = rentalObject.id;
    console.log(orderDto.rentalId);

    if (loggedUser.role === "Buyer") {
      orderDto.name = rentalObject.name;
      orderDto.logo = rentalObject.imagePath;
    } else if (loggedUser.role == "Manager") {
      const rentalObject = orderRepo.getRental(order.id);
      orderDto.name = rentalObject.name;
      orderDto.userName = user.name;
      orderDto.surname = user.surname;
      orderDto.logo = user.image;
      orderDto.idUser = user.id;
      console.log(user.image);
    }

    return orderDto;
  });

  return response;
}

function getAll() {
  return orderRepo.getAll();
}

function getFilteredVehicles(rental, startDate, endDate) {
  return orderRepo.getFreeVehicles(rental, startDate, endDate);
}

function getById(id) {
  return orderRepo.getById(id);
}

function update(id, updatedOrder) {
  return orderRepo.update(id, updatedOrder);
}

function takeOrder(order) {
  order.orderStatus = "Received";

  order.vehicles.forEach((vehicle) => {
    vehicle.status = "Rented";
    vehicleService.updateVehicle(vehicle.id, vehicle);
  });

  return orderRepo.update(order.id, order);
}

function returnOrder(order) {
  order.orderStatus = "Returned";

  order.vehicles.forEach((vehicle) => {
    vehicle.status = "Available";
    vehicleService.updateVehicle(vehicle.id, vehicle);
  });

  return orderRepo.update(order.id, order);
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getAllOrders,
  getFilteredVehicles,
  takeOrder,
  returnOrder,
};
