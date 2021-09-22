import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserApiService } from 'src/app/services/user-api.service';
import { CookieService } from 'ngx-cookie-service';

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
    private user_api_service: UserApiService,
    private router: Router,
    private cookie: CookieService
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

    this.user_api_service.login(this.form.get('email').value, this.form.get('password').value).subscribe(
      (res) => {

        let response: any = res;

        if (response.hasOwnProperty('error_message')) {
          this.error.status = true;
          this.error.message = response.error_message;

          return;
        }

        this.cookie.set('jwt', response.token);
        this.router.navigate(['minhas-anotacoes']);
      })
  }

  resetError() {
    this.error.message = '';
    this.error.status = false;
  }
}
