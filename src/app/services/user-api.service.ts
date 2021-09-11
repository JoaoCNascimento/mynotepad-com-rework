import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl: string = "http://localhost:3000/user";

  constructor(
    private httpClient: HttpClient
  ) { }

  create(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl, {
      id: Date.now(),
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      password: user.password
    });
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
}
