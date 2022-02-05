import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NotesApiService } from 'src/app/services/notes-api.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {

  faExclamation = faExclamation;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  // variable that contains the standard note form colors
  // and the value that will be passed to note object.
  color = "blue";

  note: Note;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ls: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private notesApiService: NotesApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [],
      content: []
    });
    
    this.authService.isLogged.subscribe(val => {

      this.note = this.ls.findOne(this.route.snapshot.params['id']);

      if(this.note) {
        this.configurateForm();
        return;   
      }
  
      if(!this.note && val) {
        this.notesApiService.get_note(this.route.snapshot.params['id']).subscribe(
          (res:any) => {
            this.note = res.note;
            this.configurateForm();
          }
        );
      }
    })
  }

  configurateForm() {
    this.form = this.fb.group({
      title: [this.note.title, {
        validators: [
          Validators.required,
          Validators.maxLength(60)
        ]
      }],
      content: [this.note.content || this.note.description, {
        validators: [
          Validators.required,
        ]
      }]
    });

    this.color = this.note.color;
  }

  onSubmit() {
    this.authService.isLogged.subscribe(val => {

      if (this.form.valid) {
        this.note.title = this.form.get('title').value;
        this.note.content = this.form.get('content').value;
        this.note.description = undefined;
        this.note.color = this.color;
        this.note.updated_at = new Date();
        this.note.updatedAt = new Date();
      }
      else
       return this.form.markAllAsTouched();

      console.log(this.note)
      
      if (!this.ls.findOne(this.note._id) && val) {
        this.notesApiService.put_note(this.note).subscribe(res => {
          this.router.navigate(['/minhas-anotacoes']);
        });
        return;
      }
  
      this.ls.updateOne(this.note);
      this.router.navigate(['/minhas-anotacoes']);
    })
  }

  excluirNota() {
    this.authService.isLogged.subscribe(val => {
      if(!this.ls.findOne(this.note._id) && val) {
        this.notesApiService.delete_note(this.note._id).subscribe(res => {
          this.router.navigate(['/minhas-anotacoes']);
        });
        return;
      }
      else 
        this.ls.deleteOne(this.note);
      this.router.navigate(['/minhas-anotacoes']);
    });
  }

  setColor(e) {
    // console.log(e);
    this.color = e;
  }
}
