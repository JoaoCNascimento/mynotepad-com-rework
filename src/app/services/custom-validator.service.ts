import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor(
    private userApiService: UserApiService
  ) { }

  passwordMatchValidator(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[passwordConfirm];

      if (!passwordControl || !confirmPasswordControl)
        return null;

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      )
        return null;

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
