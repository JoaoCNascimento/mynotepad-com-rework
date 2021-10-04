import { Injectable } from '@angular/core';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

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
  }

  deleteOne(note) {
    let notes: Note[] = JSON.parse(localStorage.getItem('notes')) || new Array();

    let newNote = notes.findIndex((element) => {
      if (element._id === note.id) { return true; }
    });

    notes.splice(newNote, 1);

    localStorage.setItem('notes', JSON.stringify(notes));
  }

  themeConfig() {

  }
}
