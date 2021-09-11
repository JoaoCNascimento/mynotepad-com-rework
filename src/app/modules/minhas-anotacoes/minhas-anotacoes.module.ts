import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasAnotacoesRoutingModule } from './minhas-anotacoes-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MinhasAnotacoesComponent } from 'src/app/components/minhas-anotacoes/minhas-anotacoes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CriarNotaComponent } from 'src/app/components/minhas-anotacoes/criar-nota/criar-nota.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarNotaComponent } from 'src/app/components/minhas-anotacoes/editar-nota/editar-nota.component';


@NgModule({
  declarations: [
    MinhasAnotacoesComponent,
    CriarNotaComponent,
    EditarNotaComponent
  ],
  imports: [
    CommonModule,
    MinhasAnotacoesRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    LocalStorageService
  ]
})
export class MinhasAnotacoesModule { }
