import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from 'src/app/components/cadastrar/cadastrar.component';


const routes: Routes = [
  { path: '', component: CadastrarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrarRoutingModule { }
