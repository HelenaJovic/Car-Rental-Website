const path = "./data/basket.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");

function findIndex(baskets, id) {
  return baskets.findIndex((basket) => basket.id === parseInt(id));
}

function create(basket) {
  const baskets = json_utils.jsonReader(path);
  basket.id = json_utils.generateNextId(baskets);
  baskets.push(basket);
  json_utils.saveDataToFile(baskets, path);
}

function getCartByUserId(userId) {
  const carts = json_utils.jsonReader(path);

  for (const cart of carts) {
    if (cart.user == userId) {
      return cart;
    }
  }
  return null;
}

function update(id, updatedBasket) {
  const baskets = json_utils.jsonReader(path);

  index = findIndex(baskets, id);

  baskets[index] = updatedBasket;

  baskets[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(baskets, path);

  return baskets[index];
}

function remove(id) {
  const baskets = json_utils.jsonReader(path);
  const index = findIndex(baskets, id);

  if (index !== -1) {
    const removedBasket = baskets.splice(index, 1)[0];
    json_utils.saveDataToFile(baskets, path);
    return removedBasket;
  } else {
    throw new Error("Basket not found");
  }
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const baskets = json_utils.jsonReader(path);
  index = findIndex(baskets, id);

  return baskets[index];
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getCartByUserId,
};
