import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cadastrar', loadChildren: () => import("./modules/cadastrar/cadastrar.module")
      .then(m => m.CadastrarModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () => import("./modules/login/login.module")
      .then(m => m.LoginModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'minhas-anotacoes', loadChildren: () => import("./modules/minhas-anotacoes/minhas-anotacoes.module")
      .then(m => m.MinhasAnotacoesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
