import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cadastrar', loadChildren: () => import("./modules/cadastrar/cadastrar.module")
      .then(m => m.CadastrarModule)
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'minhas-anotacoes', loadChildren: () => import("./modules/minhas-anotacoes/minhas-anotacoes.module")
      .then(m => m.MinhasAnotacoesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
