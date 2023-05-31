const path = "./data/users.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");

function create(user) {
  const users = json_utils.jsonReader(path);
  user.id = json_utils.generateNextId(users);
  users.push(user);
  json_utils.saveDataToFile(users, path);
}

function update(id, updatedUser) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.id === id);
  users[index] = updatedUser;
  users[index].id = id;
  json_utils.saveDataToFile(users, path);
}

function remove(id) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.id === id);
  users.pop(index);
  json_utils.saveDataToFile(users, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  var users = json_utils.jsonReader(path);

  index = users.findIndex((user) => user.id === id);
  return users[index];
}

module.exports = { create, update, remove, getAll, getById };
