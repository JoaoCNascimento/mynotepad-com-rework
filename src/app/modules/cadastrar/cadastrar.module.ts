import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CadastrarRoutingModule } from './cadastrar-routing.module';
import { CadastrarComponent } from 'src/app/components/cadastrar/cadastrar.component';


import { UserApiService } from 'src/app/services/user-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';


@NgModule({
  declarations: [
    CadastrarComponent
  ],
  imports: [
    CommonModule,
    CadastrarRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserApiService,
    CustomValidatorService
  ]
})
export class CadastrarModule { }
