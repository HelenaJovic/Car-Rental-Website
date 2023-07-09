const userRepo = require("../repo/user_repo");

function create(user) {
  userRepo.create(user);
}

function remove(id) {
  return userRepo.remove(id);
}

function increaseCounter(idUser) {
  const user = getById(idUser);
  user.counter = parseInt(user.counter) + 1;
  
  const currentDate = new Date();
  if (!user.lastCancellationDate || isMonthPassed(user.lastCancellationDate, currentDate)) {
    user.counter = 1;
  }
  
  user.lastCancellationDate = currentDate;
  userRepo.update(user.id, user);
}

function isMonthPassed(lastDate, currentDate) {
  const oneMonth = 30 * 24 * 60 * 60 * 1000; 
  return (currentDate - lastDate) >= oneMonth;
}

function changeIfBlocked(idUser){
  const user=getById(idUser);
  user.isBlocked=true;
  userRepo.update(user.id,user);
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

function getByUsername(username) {
  return userRepo.getByUsername(username);
}

function getAvailableManagers() {
  return userRepo.getAvailableManagers();
}

function updatePoints(user, newPoints) {
  user.points = user.points + newPoints / (100 * 133);
  if (user.points > 5 && user.points < 10) {
    (user.buyerType.name = "Silver"),
      (user.buyerType.discount = 10),
      (user.buyerType.points = 5);
  }

  if (user.points > 10) {
    (user.buyerType.name = "Gold"),
      (user.buyerType.discount = 15),
      (user.buyerType.points = 10);
  }

  return userRepo.update(user.id, user);
}

function updateManager(id, rentalObjectId) {
  return userRepo.updateManager(id, rentalObjectId);
}

function getUsersForAdmin(id) {
  return userRepo.getUsersForAdmin(id);
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getByUsername,
  getAvailableManagers,
  updateManager,
  getUsersForAdmin,
  updatePoints,
  increaseCounter,
  changeIfBlocked
};
