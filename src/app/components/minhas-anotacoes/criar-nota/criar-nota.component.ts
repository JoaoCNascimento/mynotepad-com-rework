import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faCloud, faExclamation, faSdCard, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotesApiService } from 'src/app/services/notes-api.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})
export class CriarNotaComponent implements OnInit {

  faCheck = faCheck;
  faExclamation = faExclamation;
  faArrowLeft = faArrowLeft;
  faTimes = faTimes;
  faCloud = faCloud;
  faSdCard = faSdCard;

  //---------------------
  form: FormGroup;
  // Color array that will be rendered to give user 
  // the colors options
  colors = [];
  // variable that contains the standard note form colors
  // and the value that will be passed to note object.
  color = "blue";
  note: Note;

  constructor(
    private fb: FormBuilder,
    private ls: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    public modalService: ModalService,
    private notesApiService: NotesApiService
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
      content: [null, {
        validators: [
          Validators.required,
        ]
      }]
    });
  }

  onSubmit() {
    this.authService.isLogged.subscribe(res => {
      res == true ?  this.submitHandler() : this.createLocalNote();
    });

  }

  submitHandler() {
    this.modalService.revealModal();
  }

  createNoteOnCloud() {
    if (this.form.valid) {
      this.note = {
        _id: Date.now().toPrecision(),
        title: this.form.get('title').value,
        content: this.form.get('content').value,
        description: undefined,
        color: this.color,
        created_at: new Date(),
        updated_at: new Date()
    }

      this.notesApiService.post_note(this.note).subscribe(res => {
        if(res) 
          this.router.navigate(['minhas-anotacoes'])
      });
    }
  }

  createLocalNote() {
    if (this.form.valid) {
      this.note = {
        _id: Date.now().toPrecision(),
        title: this.form.get('title').value,
        content: this.form.get('content').value,
        description: undefined,
        color: this.color,
        created_at: new Date(),
        updated_at: new Date()
    }

      this.ls.create(this.note);

      this.router.navigate(['/minhas-anotacoes']);
    }
    else
      this.form.markAllAsTouched();
  }

  setColor(e) {
    this.color = e;
  }
}
