export class User {
  constructor(
    id,
    username,
    password,
    name,
    surname,
    gender,
    birthday,
    role,
    pastRentals,
    basket,
    rentalObject,
    points,
    buyerType
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.birthday = birthday;
    this.role = role;
    this.pastRentals = pastRentals;
    this.basket = basket;
    this.rentalObject = rentalObject;
    this.points = points;
    this.buyerType = buyerType;
  }
}
