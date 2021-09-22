import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import colorsArray from 'src/app/shared/colors';

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
  colors = colorsArray;
  // variable that contains the standard note form colors
  // and the value that will be passed to note object.
  color = "blue";

  note: Note;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ls: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.note = this.ls.findOne(this.route.snapshot.params['id']);
    this.configurateForm();
  }

  configurateForm() {

    this.form = this.fb.group({
      title: [this.note.title, {
        validators: [
          Validators.required,
          Validators.maxLength(60)
        ]
      }],
      description: [this.note.description, {
        validators: [
          Validators.required,
        ]
      }]
    });

    this.color = this.note.color;
  }

  colorChange(e) {
    this.color = e.target.className;
  }

  onSubmit() {
    if (this.form.valid) {

      this.note.title = this.form.get('title').value;
      this.note.description = this.form.get('description').value;
      this.note.color = this.color;
      this.note.updated_at = new Date();

      this.ls.updateOne(this.note);

      this.router.navigate(['/minhas-anotacoes']);
    }
    else
      this.form.markAllAsTouched();
  }

  excluirNota() {
    this.ls.deleteOne(this.note);
    this.router.navigate(['/minhas-anotacoes']);
  }
}
