import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { HomeComponent } from './components/home/home.component';
import { ManutencaoComponent } from './components/manutencao/manutencao.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cadastrar',
    // loadChildren: () => import("./modules/cadastrar/cadastrar.module")
    //   .then(m => m.CadastrarModule),
    // canLoad: [AuthGuard],
    redirectTo: "manutencao"
  },
  {
    path: 'login',
    // loadChildren: () => import("./modules/login/login.module")
    //   .then(m => m.LoginModule),
    // canLoad: [AuthGuard],
    redirectTo: "manutencao"
  },
  {
    path: 'minhas-anotacoes', loadChildren: () => import("./modules/minhas-anotacoes/minhas-anotacoes.module")
      .then(m => m.MinhasAnotacoesModule)
  },
  {
    path: 'manutencao', component: ManutencaoComponent
  },
  {
    path: 'ajuda', component: AjudaComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
