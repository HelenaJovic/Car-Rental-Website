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
  return users.findIndex(user => user.id === parseInt(id));
}


function update(id, updatedUser) {
  const users = json_utils.jsonReader(path);
  console.log(users)
  index = findIndex(users, id);
  console.log(index);
  users[index] = updatedUser;
  users[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(users, path);

  return users[index];
}
function remove(id) {
  const users = json_utils.jsonReader(path);
  const index = findIndex(users, id);

  if (index !== -1) {
    const removedUser = users.splice(index, 1)[0]; // Remove the user at the specified index
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

module.exports = { create, update, remove, getAll, getById, getByUsername };
