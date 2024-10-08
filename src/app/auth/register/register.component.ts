import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService} from "../../alerts/alerts.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: this.matchValidator('password', 'confirmPassword'),
    },);
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (!control || !matchingControl) {
                return null;
              }

              if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
                return null;
              }

              if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
                return { confirmedValidator: true };
              } else {
                matchingControl.setErrors(null);
                return null;
              }
            };
  }

  get field() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.registerForm.value;

    const success = this.authService.register({ email, password });
    if (success) {
      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
    } else {
      this.alertService.error('Registration failed', { keepAfterRouteChange: true });
    }

    this.loading = false;
  }

}