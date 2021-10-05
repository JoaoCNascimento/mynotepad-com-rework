import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Interceptors
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderProviderInterceptor } from './interceptors/loader.interceptor';
import { NoteFormComponent } from './shared/components/note-form/note-form.component';
import { ManutencaoComponent } from './components/manutencao/manutencao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    NoteFormComponent,
    ManutencaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    [
      AuthInterceptorProvider,
      LoaderProviderInterceptor
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
