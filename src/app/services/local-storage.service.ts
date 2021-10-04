import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private toastrService: ToastrService
  ) {

  }

  findAll(): Note[] {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }

  findOne(id: number): Note {
    let notes: Note[] = this.findAll();
    let note: Note;

    notes.forEach(element => {
      if (element._id === id) {
        note = element;
      };
    })

    return note;
  }

  create(note: Note) {
    let notes: Note[] = JSON.parse(localStorage.getItem('notes')) || new Array();

    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));
    this.successMessage("Anotação criada com sucesso!");
  }

  updateOne(note: Note) {
    let notes: Note[] = JSON.parse(localStorage.getItem('notes')) || new Array();

    let newNoteIndex = notes.findIndex((element) => {
      if (element._id === note._id) {
        return true;
      }
    });

    notes[newNoteIndex] = note;
    localStorage.setItem('notes', JSON.stringify(notes));
    this.successMessage("Anotação atualizada com sucesso!");
  }

  deleteOne(note: Note) {
    let notes: Note[] = JSON.parse(localStorage.getItem('notes')) || new Array();

    let newNote = notes.findIndex((element) => {
      if (element._id === note._id) { return true; }
    });

    notes.splice(newNote, 1);

    localStorage.setItem('notes', JSON.stringify(notes));
    this.successMessage("Anotação excluída com sucesso!");
  }

  themeConfig(e) {
    if (localStorage.getItem("dark") === null && !e) {
      return localStorage.setItem("dark", "true");
    }

    localStorage.removeItem("dark");
  }

  successMessage(message: string) {
    this.toastrService.success(message, "", {
      progressBar: true
    });
  }
}
