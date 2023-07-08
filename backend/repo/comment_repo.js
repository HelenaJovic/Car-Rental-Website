const path = "./data/comment.json";
const fs = require("fs");
const json_utils = require("../utils/json_utils");
const { get } = require("../controller/rental_car_controller");

function findIndex(comments, id) {
  return comments.findIndex((comment) => comment.id === parseInt(id));
}


function getCommentsByRentalId(rentalId) {
    const comments = getAll();
    const filteredComments = comments.filter(comment => comment.idRental === parseInt(rentalId));
    return filteredComments;
  }
  

function create(comment) {
  const comments = json_utils.jsonReader(path);
  comment.id = json_utils.generateNextId(comments);
  comments.push(comment);
  json_utils.saveDataToFile(comments, path);
}

function isAlreadyCommented(idRental, idUser) {
    const comments = getAll();
   


    const existingComment = comments.find(
        comment => comment.idRental === parseInt(idRental) && comment.idUser === parseInt(idUser)
      );
      
    
  
    return existingComment === undefined;
  }
  
  



function update(id, updatedComment) {
  const comments = json_utils.jsonReader(path);

  index = findIndex(comments, id);

  comments[index] = updatedComment;

  comments[index].id = parseInt(id, 10);

  json_utils.saveDataToFile(comments, path);

  return comments[index];
}



function remove(id) {
  const comments = json_utils.jsonReader(path);
  const index = findIndex(comments, id);

  if (index !== -1) {
    const removedBasket = comments.splice(index, 1)[0];
    json_utils.saveDataToFile(comments, path);
    return removedBasket;
  } else {
    throw new Error("Basket not found");
  }
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const comments = json_utils.jsonReader(path);
  index = findIndex(comments, id);

  return comments[index];
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  isAlreadyCommented,
  getCommentsByRentalId
};
