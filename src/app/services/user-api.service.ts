import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl: string = "http://localhost:8089/api/v1/user";

  private readonly TOKEN = "token";

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { }

  create(user: User): Observable<any> {
    console.log(user);

    return this.httpClient.post(this.baseUrl, {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      password: user.password
    }).pipe(
      map((res: any) => {
        localStorage.setItem(this.TOKEN, res.token);
        return res;
      }),
      catchError(er => { this.errMessages(); console.log(er); return er })
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

  errMessages() {
    this.toastrService.error("", "Houve um erro no servidor, tente novamente mais tarde.", {
      closeButton: true,
      progressBar: true,
      timeOut: 4000
    });
  }
}
