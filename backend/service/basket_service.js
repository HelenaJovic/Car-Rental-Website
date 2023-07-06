const basketRepo = require("../repo/basket_repo");

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

function update(id, updatedBasket) {
  return basketRepo.update(id, updatedBasket);
}

function addToCart(userId, cartData) {
  const userCart = basketRepo.getCartByUserId(userId);

  if (userCart != null) {
    userCart.vehicles.push(...cartData.vehicles);
    const priceArray = cartData.price.split(",").map(Number);
    const totalPrice = priceArray.reduce((sum, value) => sum + value, parseInt(userCart.price));
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
  addToCart
};
