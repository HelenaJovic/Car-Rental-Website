class RentalObject {
  constructor(
    id,
    name,
    vehicles,
    workHours,
    status,
    location,
    logo,
    grade,
    imagePath
  ) {
    this.id = id;
    this.name = name;
    this.vehicles = vehicles;
    this.workHours = workHours;
    this.status = status;
    this.location = location;
    this.logo = logo;
    this.grade = grade;
    this.imagePath = imagePath;
  }
}

module.exports = RentalObject;
