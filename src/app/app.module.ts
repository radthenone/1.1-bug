import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponent } from './alerts/alerts.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { AddCarPartComponent } from './cars/add-car-part/add-car-part.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    LogoutComponent,
    AlertsComponent,
    HomeComponent,
    CarsComponent,
    AddCarComponent,
    AddCarPartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
