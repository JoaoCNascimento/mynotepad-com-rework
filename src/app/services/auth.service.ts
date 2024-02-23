import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = new BehaviorSubject<boolean>(false);

  baseUrl = environment.hostUrl + 'user/login';

  private readonly TOKEN = "token";

  get token() {
    return localStorage.getItem(this.TOKEN);
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {
    this.isLogged.next(!!this.token);
    this.errMessages = this.errMessages.bind(this);
  }

  login(email: string, password: string): Observable<any> {

    return this.httpClient.post(this.baseUrl, {
      email, password
    }).pipe(
      tap((res: any) => {
        if (res.token) {
          this.isLogged.next(true);
          localStorage.setItem(this.TOKEN, res.token);
        }
        return res;
      }),
      catchError(er => { this.errMessages(er); return er })
    );

  }

  logout() {
    this.isLogged.next(false);
    localStorage.removeItem(this.TOKEN);
    localStorage.setItem('sessionTimeout', 'true');
    window.location.assign("/");
  }

  // toastr messages
  errMessages(er) {
    if(er.statusText && er.statusText!.toLocaleLowerCase() == "Unknown Error".toLocaleLowerCase())
      return this.toastrService.error("", "Houve um erro ao tentar comunicar-se com o servidor, tente novamente mais tarde.", {
        closeButton: true,
        progressBar: true,
        timeOut: 5000
      });
    
    if(er.error)
      return this.toastrService.error("", er.error.error_message, {
        closeButton: true,
        progressBar: true,
        timeOut: 4000
      });

    this.toastrService.error("", er, {
      closeButton: true,
      progressBar: true,
      timeOut: 4000
    });
    
  }
}
