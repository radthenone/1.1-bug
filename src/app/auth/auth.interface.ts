import { AbstractControl } from '@angular/forms';

export type FormControls = {
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
};

export interface JwtPayload {
  userId?: number;
  email?: string;
}
