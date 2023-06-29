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

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
};
