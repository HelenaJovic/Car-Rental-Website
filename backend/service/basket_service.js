const basketRepo = require("../repo/basket_repo");
const CartModel = require("../model/basket");
const basketDTO = require("../dto/basketDTO");


function create(basket) {
  basketRepo.create(basket);
}

function remove(id) {
  return basketRepo.remove(id);
}

function getAll() {
  return basketRepo.getAll();
}

function getById(id) {
  return basketRepo.getById(id);
}

function countVehicles(vehicles, vehicleId) {
  return vehicles.filter((vehicle) => vehicle.id === vehicleId).length;
}

function getByUserId(userId) {
  var basket = basketRepo.getCartByUserId(userId);

  const basketDTOInstance = new basketDTO(
    basket.id,
    basket.vehicles,
    basket.user,
    basket.startDate,
    basket.endDate,
    basket.price,
    basket.rentalId
  );

  basketDTOInstance.vehicles.forEach((vehicle) => {
    vehicle.counter = countVehicles(basket.vehicles, vehicle.id);
  });

  basket.vehicles.forEach((vehicle) => {
    vehicle.totalPrice = vehicle.price * vehicle.counter;
  });

  return basketDTOInstance;
}

function update(id, updatedBasket) {
  return basketRepo.update(id, updatedBasket);
}

function deleteVehicleFromBasket(basket, vehicleId) {
  basket.vehicles = basket.vehicles.filter(
    (vehicle) => vehicle.id !== vehicleId
  );
  return basket;
}

function addToCart(userId, cartData) {
  const userCart = basketRepo.getCartByUserId(userId);

  if (userCart != null) {
    userCart.vehicles.push(...cartData.vehicles);
    const priceArray = cartData.price.split(",").map(Number);
    const totalPrice = priceArray.reduce(
      (sum, value) => sum + value,
      parseInt(userCart.price)
    );
    userCart.price = totalPrice;
    basketRepo.update(userCart.id, userCart);

    return userCart;
  } else {
    return basketRepo.create(cartData);
  }
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  addToCart,
  getByUserId,
  countVehicles,
  deleteVehicleFromBasket,
};
