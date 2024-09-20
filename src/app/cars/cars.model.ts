import { PartInterface, CarInterface } from './cars.interface';

export class Part implements PartInterface {
  id?: number;
  name?: string;
  price?: number;

  constructor(part: PartInterface) {
    this.id = part.id;
    this.name = part.name;
    this.price = part.price;
  }
}

export class Car implements CarInterface {
  id?: number;
  name?: string;
  parts: Part[];
  userId?: number;

  constructor(car: CarInterface) {
    this.id = car.id;
    this.name = car.name;
    this.parts = car.parts || [];
    this.userId = car.userId;
  }
}
