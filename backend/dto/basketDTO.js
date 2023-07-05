class BasketDTO {
  constructor(id, vehicles, user, startDate, endDate, price, rentalId) {
    this.id = id;
    this.vehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      counter: 0,
      ukupna: vehicle.price,
    }));
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.rentalId = rentalId;
  }
}

module.exports = BasketDTO;
