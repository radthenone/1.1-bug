import { Component, OnInit } from '@angular/core';
import { Car, Part } from './cars.model';
import { CarsService } from './cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      console.log('Loaded cars:', this.cars);
    });
  }

  deleteCar(id: number): void {
    this.carsService.deleteCar(id);
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  getPartsNames(parts: Part[]): string[] {
    return parts.map((part) => part.name || '');
  }

  getTotalPartsCost(parts: Part[]): number {
    return parts.reduce((total, part) => total + (part.price || 0), 0);
  }
}
