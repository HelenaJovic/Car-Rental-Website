class OrderByerDTO {
  constructor(
    orderId,
    date,
    duration,
    price,
    orderStatus,
    logo,
    name,
    vehicles,
    userName,
    surname,
    idUser
  ) {
    this.orderId = orderId;
    this.date = date;
    this.duration = duration;
    this.price = price;
    this.orderStatus = orderStatus;
    this.logo=logo;
    this.name=name;
    this.vehicles=vehicles;
    this.userName=userName;
    this.surname=surname;
    this.idUser=idUser;
  }
}

module.exports = OrderByerDTO;
