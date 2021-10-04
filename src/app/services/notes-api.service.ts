import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  baseUrl = "http://localhost:8089/api/v1/notes";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 

  }

  get_notes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.baseUrl);
  }

  get_note(id: string): Observable<Note>{
    return this.httpClient.get<Note>(this.baseUrl + '/' + id);
  }


}
