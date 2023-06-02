const userRepo = require("../repo/user_repo");

function create(user) {
  userRepo.create(user);
}

function remove(id) {
  return userRepo.remove(id);
}

function getAll() {
  return userRepo.getAll();
}

function getById(id) {
  return userRepo.getById(id);
}

function update(id, updatedUser) {
  return userRepo.update(id, updatedUser);
}

module.exports = { create, remove, getAll, getById, update };
