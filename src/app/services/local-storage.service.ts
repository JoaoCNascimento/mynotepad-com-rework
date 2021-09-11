import { Injectable } from '@angular/core';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    localStorage.getItem('note');
  }

  findAll(): Note[] {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }

  findOne() {

  }

  create(note: Note) {

    let notes = new Array();

    if (localStorage.hasOwnProperty('notes'))
      notes = JSON.parse(localStorage.getItem('notes'));

    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));
  }

  updateOne() {

  }

  deleteOne() {

  }
}
