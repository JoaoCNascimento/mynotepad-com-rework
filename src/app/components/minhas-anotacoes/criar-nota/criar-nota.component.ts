import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})
export class CriarNotaComponent implements OnInit {

  faCheck = faCheck;
  faExclamation = faExclamation;
  faArrowLeft = faArrowLeft;
  //---------------------
  form: FormGroup;
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

  constructor(
    private fb: FormBuilder,
    private ls: LocalStorageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    this.form = this.fb.group({
      title: [null, {
        validators: [
          Validators.required,
          Validators.maxLength(60)
        ]
      }],
      description: [null, {
        validators: [
          Validators.required,
        ]
      }]
    });
  }

  onSubmit() {
    console.log(this.form.controls);

    if (this.form.valid) {
      this.note = {
        id: Date.now().toPrecision(),
        title: this.form.get('title').value,
        description: this.form.get('description').value,
        color: this.color,
        created_at: Date.now().toPrecision(),
        updated_at: Date.now().toPrecision()
      }
      this.ls.create(this.note);

      this.router.navigate(['/minhas-anotacoes']);

    }
    else {
      this.form.markAllAsTouched();
    }
  }

  colorChange(e) {
    this.color = e.target.className;
  }

}
