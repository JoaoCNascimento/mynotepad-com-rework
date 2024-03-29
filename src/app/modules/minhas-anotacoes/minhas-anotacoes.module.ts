import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasAnotacoesRoutingModule } from './minhas-anotacoes-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MinhasAnotacoesComponent } from 'src/app/components/minhas-anotacoes/minhas-anotacoes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CriarNotaComponent } from 'src/app/components/minhas-anotacoes/criar-nota/criar-nota.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarNotaComponent } from 'src/app/components/minhas-anotacoes/editar-nota/editar-nota.component';
import { ColorsComponent } from 'src/app/shared/components/colors/colors.component';
import { NoteTableComponent } from 'src/app/shared/components/note-table/note-table.component';


@NgModule({
  declarations: [
    MinhasAnotacoesComponent,
    CriarNotaComponent,
    EditarNotaComponent,
    ColorsComponent,
    NoteTableComponent
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
