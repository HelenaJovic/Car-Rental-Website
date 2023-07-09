const rentalCarRepo = require("../repo/rental_car_repo");
const orderService = require("../service/order_service");
const rentalDTO = require("../dto/rentalDTO");
const commentDTO = require("../dto/commentDTO");
const commentService = require("../service/comment_service");
const userService = require("../service/user_service");

function create(car_rental) {
  return rentalCarRepo.create(car_rental);
}

function getAllCommentsByRentalId(idRental, role) {
  const comments = commentService.getCommentsByRentalId(idRental);
  const commentDTOs = [];

  if (role === "Manager" || role === "Administrator") {
    for (const comment of comments) {
      const user = userService.getById(comment.idUser);

      const commentDto = new commentDTO();
      commentDto.commentId = comment.id;
      commentDto.logo = user.image;
      commentDto.userName = user.name;
      commentDto.idUser = user.id;
      commentDto.surname = user.surname;
      commentDto.text = comment.text;
      commentDto.rentalId = idRental;
      commentDto.isApproved = comment.isApproved; // Pretpostavka da komentar ima polje isApproved
      commentDto.isSeen = comment.isSeen;
      commentDto.grade = comment.grade;

      commentDTOs.push(commentDto);
    }
  } else if (role === "Buyer") {
    const filteredComments = comments.filter(
      (comment) => comment.isApproved && comment.isSeen
    );

    for (const comment of filteredComments) {
      const user = userService.getById(comment.idUser);

      const commentDto = new commentDTO();
      commentDto.commentId = comment.id;
      commentDto.logo = user.image;
      commentDto.userName = user.name;
      commentDto.idUser = user.id;
      commentDto.surname = user.surname;
      commentDto.text = comment.text;
      commentDto.rentalId = idRental;
      commentDto.isApproved = comment.isApproved;
      commentDto.isSeen = comment.isSeen;
      commentDto.grade = comment.grade;

      commentDTOs.push(commentDto);
    }
  }
  return commentDTOs;
}
function IsManager(idRental, idUser) {
  return rentalCarRepo.IsManager(idRental, idUser);
}

function getFreeRentals(startDate, endDate) {
  const rentals = rentalCarRepo.getAll();

  const response = rentals
    .map((rental) => {
      const vehicles = orderService.getFilteredVehicles(
        rental,
        startDate,
        endDate
      );

      if (vehicles.length === 0) {
        return null;
      }

      const rentalDto = new rentalDTO();
      rentalDto.id = rental.id;
      rentalDto.nameRental = rental.name;
      rentalDto.logoR = rental.imagePath;
      rentalDto.rentalId = rental.id;
      rentalDto.vehicles = vehicles;

      return rentalDto;
    })
    .filter((rentalDto) => rentalDto !== null);

  return response;
}

function getFreeRentalById(rentalId, startDate, endDate) {
  const rental = rentalCarRepo.getById(rentalId);
  const vehicles = orderService.getFilteredVehicles(rental, startDate, endDate);

  const rentalDto = new rentalDTO();
  rentalDto.id = rental.id;
  rentalDto.location = rental.location;
  rentalDto.workHours = rental.workHours;
  rentalDto.status = rental.status;
  rentalDto.nameRental = rental.name;
  rentalDto.logoR = rental.imagePath;
  rentalDto.rentalId = rental.id;
  rentalDto.vehicles = vehicles;

  if (vehicles.length === 0) {
    return null; // Ako nema slobodnih vozila za dati rentalId i datume
  }

  return rentalDto;
}

function remove(id) {
  return rentalCarRepo.remove(id);
}

function getAll() {
  return rentalCarRepo.getAll();
}

function getSortedCarsByStatus() {
  const allCars = rentalCarRepo.getAll();
  const comments = commentService.getAll();

  allCars.forEach((car) => {
    if (!isWithinWorkingHours(car)) {
      car.status = false;

      rentalCarRepo.update(car.id, car);
    } else {
      car.status = true;
      rentalCarRepo.update(car.id, car);
    }
  });

  allCars.sort((car1, car2) => {
    if (car1.status === true && car2.status !== true) {
      return -1;
    } else if (car1.status !== true && car2.status === true) {
      return 1;
    }
    return 0;
  });

  allCars.forEach(car => {
    const rentalComments = comments.filter(comment => comment.idRental === car.id);
    const totalRating = rentalComments.reduce((sum, comment) => sum + parseInt(comment.grade), 0);
    const commentCount = rentalComments.length;
    const averageRating = commentCount > 0 ? parseFloat((totalRating / commentCount).toFixed(2)) : 0;
    car.grade = averageRating;
    rentalCarRepo.update(car);
  });

  return allCars;
}


function isWithinWorkingHours(car) {
  const now = new Date();
  const workHoursStart = getTimeFromString(car.workHoursStart);
  const workHoursEnd = getTimeFromString(car.workHoursEnd);

  if (workHoursStart <= workHoursEnd) {
    return now >= workHoursStart && now <= workHoursEnd;
  } else {
    return now >= workHoursStart || now <= workHoursEnd;
  }
}

function getTimeFromString(timeString) {
  const [hours, minutes] = timeString.split(":");
  const now = new Date();
  const time = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
  return time;
}




function addNewCar(id,vehicle)
{
  return rentalCarRepo.addNewCar(id,vehicle);
  
}




function deleteNewCar(id,idCar)
{
  return rentalCarRepo.deleteNewCar(id,idCar);
  
}


function updateNewCar(updatedVehicle, idCar) {
 return rentalCarRepo.updateNewCar(updatedVehicle,idCar);
}

function getById(id) {
  return rentalCarRepo.getById(id);
}

function update(id, updatedCar) {
  return rentalCarRepo.update(id, updatedCar);
}

function getAllVehicles(id) {
  return rentalCarRepo.getAllVehicles(id);
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getSortedCarsByStatus,
  getAllVehicles,
  getFreeRentals,
  addNewCar,
  updateNewCar,
  deleteNewCar,
  IsManager,
  getFreeRentalById,
  getAllCommentsByRentalId,
};
