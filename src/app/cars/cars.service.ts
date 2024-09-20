import { Injectable } from '@angular/core';
import { Car } from './cars.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarInterface } from './cars.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  public cars: Observable<Car[]> = this.carsSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      if (user && user.id) {
        this.loadUserCars(user.id);
      } else {
        this.carsSubject.next([]);
      }
    });
  }

  private loadUserCars(userId: number): void {
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    const userCars = storedCars.filter((car: Car) => car.userId === userId);
    this.carsSubject.next(userCars);
    console.log('User cars:', userCars);
  }

  public getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  addCar(newCar: CarInterface): void {
    const userId = this.authService.userValue?.id;
    if (userId) {
      const car: Car = {
        ...newCar,
        userId,
        parts: newCar.parts || [],
      };
      const updatedCars = [...this.carsSubject.value, car];
      this.carsSubject.next(updatedCars);
      this.saveCars(updatedCars);
    }
  }

  private saveCars(cars: Car[]): void {
    localStorage.setItem('cars', JSON.stringify(cars));
  }

  deleteCar(carName: string): void {
    const updatedCars = this.carsSubject.value.filter(
      (car) => car.name !== carName,
    );
    this.carsSubject.next(updatedCars);
    this.saveCars(updatedCars);
  }
}
