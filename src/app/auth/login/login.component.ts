import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AlertService} from "../../alerts/alerts.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	submitted = false;
	loading = false;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private alertService: AlertService
	) {
	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}

	get field() {
		return this.loginForm.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		this.alertService.clear();

		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		const {email, password} = this.loginForm.value;

		const success = this.authService.login(email, password);
		if (success) {
			this.alertService.success('Login successful', {keepAfterRouteChange: true});
		} else {
			this.alertService.error('Login failed', {keepAfterRouteChange: true});
		}

		this.loading = false;
	}
}