class Basket {
  constructor(id, vehicles, user, price, startDate, endDate, rentalId) {
    this.id = id;
    this.vehicles = vehicles;
    this.user = user;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rentalId = rentalId;
  }
}

module.exports = Basket;
