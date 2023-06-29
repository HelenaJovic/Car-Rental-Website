const orderRepo = require("../repo/order_repo");
const orderDTO=require("../dto/orderDTO");


function create(order) {
  return orderRepo.create(order);
}

function remove(id) {
  return orderRepo.remove(id);
}


function getAllOrders() {
    const orders = orderRepo.getAll();
    const response = orders.map(order => {
      const orderDto = new orderDTO();
      orderDto.orderId = order.id;
      orderDto.date = orderRepo.getDate(order.id);
      orderDto.price = orderRepo.getPrice(order.id);
      orderDto.orderStatus = orderRepo.getStatus(order.id);
      orderDto.duration = orderRepo.getDuration(order.id);
      const rentalObject=orderRepo.getRental(order.id);
      orderDto.name = rentalObject && rentalObject.name;
      orderDto.logo = rentalObject.imagePath;
      orderDto.vehicles=order.vehicles;
        console.log(orderDto.orderStatus)

      return orderDto;
    });
  
    return response;
  }

function getAll() {
  return orderRepo.getAll();
}

function getById(id) {
  return orderRepo.getById(id);
}

function update(id, updatedOrder) {
  return orderRepo.update(id, updatedOrder);
}



module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getAllOrders,
};
