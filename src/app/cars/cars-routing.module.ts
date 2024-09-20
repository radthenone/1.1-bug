import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CarsComponent } from './cars.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddCarPartComponent } from './add-car-part/add-car-part.component';

const carsRoutes: Routes = [
  {
    path: '',
    component: CarsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-car',
        component: AddCarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-car-part',
        component: AddCarPartComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
