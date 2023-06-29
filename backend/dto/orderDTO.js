class OrderByerDTO {
  constructor(
    orderId,
    date,
    duration,
    price,
    orderStatus,
    logo,
    name,
    vehicles
  ) {
    this.orderId = orderId;
    this.date = date;
    this.duration = duration;
    this.price = price;
    this.orderStatus = orderStatus;
    this.logo=logo;
    this.name=name;
    this.vehicles=vehicles;
  }
}

module.exports = OrderByerDTO;
