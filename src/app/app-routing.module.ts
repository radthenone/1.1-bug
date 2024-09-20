import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const authModule = () =>
  import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule);
const carsModule = () =>
  import('./cars/cars-routing.module').then((m) => m.CarsRoutingModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: authModule },
  { path: 'cars', loadChildren: carsModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
