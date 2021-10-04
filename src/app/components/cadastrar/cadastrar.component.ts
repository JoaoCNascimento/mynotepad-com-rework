import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  emailAlreadyTaken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private customValidatorService: CustomValidatorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    this.form = this.fb.group({
      name: [null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      }],

      email: [null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],

      birthDate: [null, {
        validators: [
          Validators.required,
        ]
      }],

      password: [null, {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }],

      passwordConfirm: [null, {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }],
      agreement: [null,]
    }, {
      validators: [
        this.customValidatorService.passwordMatchValidator("password", "passwordConfirm"),
      ]
    });
  }

  onSubmit() {

    if (this.form.valid && !this.form.get('agreement').value) {
      this.form.get('agreement').markAsPending();
    }

    if (this.form.valid) {
      let user: User = {
        _id: undefined,
        name: this.form.get('name').value,
        birthDate: this.form.get('birthDate').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value
      }

      this.userApiService.create(user).subscribe(res => {
        if (res.hasOwnProperty("error_message")) {
          this.form.get('email').markAsPending();
          return this.toastr.error(res.error_message);
        }

        this.toastr.success("Cadastrado com sucesso!");
        return window.location.assign('minhas-anotacoes');
      });
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  validateEmail() {
    this.emailAlreadyTaken = !this.emailAlreadyTaken;
  }
}
