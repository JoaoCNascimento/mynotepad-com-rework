import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  validatePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService
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
          Validators.minLength(6),
        ]
      }],

      agreement: [, {
      }]
    });
  }

  checkPasswordValidation() {

    if (this.form.get('password').value === this.form.get('passwordConfirm').value) {
      this.form.get('passwordConfirm').setErrors({ 'incorrect': true })
      return this.validatePassword = true;
    }

    return this.validatePassword = false;
  }

  onSubmit() {

    if (this.form.valid && !this.form.get('agreement').value) {
      console.log("Você deve aceitar os termos de uso.")
    }

    if (this.form.valid) {

    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
