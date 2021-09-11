import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {

  faExclamation = faExclamation;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  // Color array that will be rendered to give user 
  // the colors options
  colors = [
    { value: "blue" },
    { value: "yellow" },
    { value: "red" },
    { value: "green" },
    { value: "pink" },
    { value: "white" },
    { value: "black" },
  ]
  // variable that contains the standard note form colors
  // and the value that will be passed to note object.
  color = "blue";
  note: Note;

  form: FormGroup;

  constructor(
    private ls: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let note_id = this.route.snapshot.params['id'];
    console.log(note_id);
    //this.ls.findOne();
  }

  colorChange(e) {

  }

  onSubmit() {

  }
}
