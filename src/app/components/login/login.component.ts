import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserApiService } from 'src/app/services/user-api.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = {
    status: false,
    message: ''
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }


  configurateForm() {
    return this.form = this.fb.group({
      email: [null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      password: [null, {
        validators: [
          Validators.required
        ]
      }],
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }

    let email = this.form.get('email').value;
    let password = this.form.get('password').value;

    this.authService.login(email, password).subscribe(
      (res) => {

        let response: any = res;

        if (response.hasOwnProperty('error_message')) {
          this.error.status = true;
          this.error.message = response.error_message;

          return;
        }

        window.location.assign('minhas-anotacoes');
      })
  }

  resetError() {
    this.error.message = '';
    this.error.status = false;
  }
}
