import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  baseUrl = "http://localhost:8089/api/v1/notes";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
}
