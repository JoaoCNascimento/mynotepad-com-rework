import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faQuestion, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { NotesApiService } from 'src/app/services/notes-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.css']
})
export class MinhasAnotacoesComponent implements OnInit {

  faPlus = faPlus;
  faQuestion = faQuestion;
  faFileDownload = faFileDownload;

  isLogged = false;

  localNotes: Note[] = [];
  userNotes: Note[] = [];

  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private localStoredNotes: LocalStorageService,
    //private notesApiService: NotesApiService,
    private router: Router,
    private route: ActivatedRoute,
    //private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.findAllLocalStorage();
  }

  findAllLocalStorage() {
    this.localNotes = this.localStoredNotes.findAll();
  }

  editNote(e) {
    console.log(e);
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }

}
