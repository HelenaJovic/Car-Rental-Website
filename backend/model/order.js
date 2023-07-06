class Order {
  constructor(
    id,
    vehicles,
    rentalObject,
    date,
    duration,
    price,
    buyer,
    orderStatus,
    rejectionReason
  ) {
    this.id = id;
    this.vehicles = vehicles;
    this.rentalObject = rentalObject;
    this.date = date;
    this.duration = duration;
    this.price = price;
    this.buyer = buyer;
    this.orderStatus = orderStatus;
    this.rejectionReason = rejectionReason;
  }
}

module.exports = Order;
