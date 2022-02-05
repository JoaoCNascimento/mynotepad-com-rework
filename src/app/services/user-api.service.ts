import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl = environment.hostUrl + 'user';

  private readonly TOKEN = "token";

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  create(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl, {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      password: user.password
    }).pipe(
      tap(res => {this.toastrService.success("",'Cadastrado com sucesso!'); return this.router.navigate(['login'], {queryParams: {
        'confirmationWindow': true
      }}); }),
      catchError(er => { this.errMessages(er); console.log(er); return er })
    );
  }

  findOne(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  updateOne(user: User): Observable<any> {
    return this.httpClient.put(this.baseUrl, user);
  }

  deleteOne(): Observable<any> {
    return this.httpClient.delete(this.baseUrl);
  }

  errMessages(er) {
    if(er != null) {
      return this.toastrService.error("", er.error.error_message, {
        closeButton: true,
        progressBar: true,
        timeOut: 4000
      });
    }

    this.toastrService.error("", "Houve um erro no servidor, tente novamente mais tarde.", {
      closeButton: true,
      progressBar: true,
      timeOut: 4000
    });
  }
}
