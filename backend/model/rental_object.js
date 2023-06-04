class RentalObject {
  constructor(id, name, workHours, status, location, logo, grade,imagePath) {
    this.id = id;
    this.name = name;
    this.vehicles = []; // Initialize vehicles as an empty list
    this.workHours = workHours;
    this.status = status;
    this.location = location;
    this.logo = logo;
    this.grade = grade;
    this.imagePath = imagePath;
  }
}


module.exports = RentalObject;
