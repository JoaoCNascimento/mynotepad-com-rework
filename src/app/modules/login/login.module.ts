import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UserApiService } from 'src/app/services/user-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    UserApiService,
    AuthService
  ]
})
export class LoginModule { }
