import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { CarInterface } from '../cars.interface';
import { Car, Part } from '../cars.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  carForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
  ) {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      parts: this.fb.array([]), // Dynamic FormArray for parts
    });
  }

  ngOnInit(): void {}

  get parts(): FormArray {
    return this.carForm.get('parts') as FormArray;
  }

  get field() {
    return this.carForm.controls;
  }

  addPart(): void {
    this.parts.push(
      this.fb.group({
        name: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
      }),
    );
  }

  removePart(index: number): void {
    this.parts.removeAt(index);
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const newCar: CarInterface = {
        name: this.carForm.value.name,
        parts:
          this.carForm.value.parts.map((part: Part) => ({
            name: part.name,
            price: part.price,
          })) || [],
      };
      this.carsService.addCar(newCar);
      this.carForm.reset();
    }
  }
}
