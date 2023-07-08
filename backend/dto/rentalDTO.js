class rentalDTO {
  constructor(
    id,
    imageV,
    nameRental,
    workHours,
    logoR,
    nameV,
    vehicles,
    location,
    status,
    rentalId
  ) {
    this.id = id;
    this.imageV = imageV;
    this.workHours = workHours;
    this.logoR = logoR;
    this.nameRental = nameRental;
    this.vehicles = vehicles;
    this.nameV = nameV;
    this.location = location;
    this.status = status;
    this.rentalId = rentalId;
  }
}

module.exports = rentalDTO;
