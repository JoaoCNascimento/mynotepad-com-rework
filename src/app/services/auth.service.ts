import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = new BehaviorSubject<boolean>(false);

  baseUrl = "http://localhost:8089/api/v1/user/login";

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
  }

  login(email: string, password: string) {

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
    localStorage.removeItem(this.TOKEN);
    window.location.assign('');
  }

  // toastr messages
  errMessages(er) {
    console.log(er);
    this.toastrService.error("", "Houve um erro no servidor, tente novamente mais tarde.", {
      closeButton: true,
      progressBar: true,
      timeOut: 4000
    });
  }
}
