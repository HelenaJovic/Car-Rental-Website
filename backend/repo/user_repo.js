const path = "./data/users.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");

function create(user) {
  const users = json_utils.jsonReader(path);
  user.id = json_utils.generateNextId(users);
  users.push(user);
  json_utils.saveDataToFile(users, path);
}

function findIndex(users, id) {
  return users.findIndex((user) => user.id === parseInt(id));
}

function updateManager(id, rentalObjectId) {
  const users = json_utils.jsonReader(path);

  index = findIndex(users, id);

  users[index].rentalObject = rentalObjectId;

  users[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(users, path);

  return users[index];
}

function update(id, updatedUser) {
  const users = json_utils.jsonReader(path);

  index = findIndex(users, id);

  users[index] = updatedUser;

  users[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(users, path);

  return users[index];
}
function remove(id) {
  const users = json_utils.jsonReader(path);
  const index = findIndex(users, id);

  if (index !== -1) {
    const removedUser = users.splice(index, 1)[0];
    json_utils.saveDataToFile(users, path);
    return removedUser;
  } else {
    throw new Error("User not found");
  }
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const users = json_utils.jsonReader(path);
  index = findIndex(users, id);

  return users[index];
}

function getByUsername(username) {
  var users = json_utils.jsonReader(path);
  const user = users.find((user) => user.username === username);

  return user;
}

function getAvailableManagers() {
  var users = json_utils.jsonReader(path);
  var availableManagers = users.filter(
    (user) => user.role == "Manager" && user.rentalObject == null
  );
  return availableManagers;
}

function getUsersForAdmin(id) {
  var users = json_utils.jsonReader(path);
  var filteredUsers = users.filter(function (user) {
    return user.id !== id;
  });

  return filteredUsers;
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getByUsername,
  getAvailableManagers,
  updateManager,
  getUsersForAdmin,
};
