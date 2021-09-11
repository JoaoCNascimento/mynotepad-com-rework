import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastrarModule } from './modules/cadastrar/cadastrar.module';
import { EditarNotaComponent } from './components/minhas-anotacoes/editar-nota/editar-nota.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CadastrarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
