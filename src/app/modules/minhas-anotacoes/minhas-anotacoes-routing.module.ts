import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarNotaComponent } from 'src/app/components/minhas-anotacoes/criar-nota/criar-nota.component';
import { EditarNotaComponent } from 'src/app/components/minhas-anotacoes/editar-nota/editar-nota.component';
import { MinhasAnotacoesComponent } from 'src/app/components/minhas-anotacoes/minhas-anotacoes.component';

const routes: Routes = [
  { path: '', component: MinhasAnotacoesComponent },
  { path: 'nova-anotacao', component: CriarNotaComponent },
  { path: 'editar-nota/:id', component: EditarNotaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhasAnotacoesRoutingModule { }
