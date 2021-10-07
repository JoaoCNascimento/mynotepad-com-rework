import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  baseUrl = "http://localhost:8089/api/v1/notes";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  get_notes() {
    return this.httpClient.get<Note[]>(this.baseUrl).pipe(
      tap(res => { this.successMessage("Anotações carregadas com sucesso!"); return res }),
      catchError(this.handleError)
    );
  }

  get_note(id: string) {
    return this.httpClient.get<Note>(this.baseUrl + '/' + id).pipe(
      tap(res => { return res }),
      catchError(this.handleError)
    );;
  }

  post_note(note: Note) {
    return this.httpClient.put(this.baseUrl, note).pipe(
      tap(res => { this.successMessage("Anotação criada com sucesso!"); return res }),
      catchError(this.handleError)
    )
  }

  put_note(note: Note) {
    return this.httpClient.put(`${this.baseUrl}/${note._id}`, note).pipe(
      tap(res => { this.successMessage("Anotação atualizada com sucesso!"); return res }),
      catchError(this.handleError)
    )
  }

  delete_note(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
      tap(res => { this.successMessage("Anotação deletada com sucesso!"); return res }),
      catchError(this.handleError)
    )
  }

  upload_local_notes(notes: Note[]) {
    this.httpClient.post(this.baseUrl + '/upload', notes).pipe(
      tap(res => { this.successMessage("Anotações upadas locais com sucesso!"); return res }),
      catchError(this.handleError)
    );
  }

  successMessage(message: any) {
    this.toastrService.success(message, "", {
      progressBar: true,
    });
  }

  handleError(er: any): any {
    if (er) {
      this.toastrService.error("Houve um erro no servidor, tente novamente mais tarde.");
    }

    this.toastrService.error("Houve um erro, verifique sua conexão à internet.")
  }
}
