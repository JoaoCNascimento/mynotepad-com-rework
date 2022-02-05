import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserApiService } from 'src/app/services/user-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarSenha = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  form: FormGroup;
  error = {
    status: false,
    message: ''
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    const confirmationWindow = new URLSearchParams(window.location.search).get('confirmationWindow');
    const accountConfirmed = new URLSearchParams(window.location.search).get('accountConfirmed');
    
    if(confirmationWindow === 'true') {
      this.toastrService.info("",'Verifique sua conta através do link enviado ao seu email.', {
        timeOut: 10000,
        progressBar: true,
        closeButton: true
      });
    }

    if(accountConfirmed === 'true') {
      this.toastrService.success("",'Conta ativada com sucesso!', {
        timeOut: 10000,
        progressBar: true,
        closeButton: true
      });
    }
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

        if (response.hasOwnProperty('error')) {
          this.error.status = true;
          this.error.message = response.error.error_message;

          return;
        }

        window.location.assign('minhas-anotacoes');
      })
  }

  resetError() {
    this.error.message = '';
    this.error.status = false;
  }

  mostrarSenhaSwitch() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
