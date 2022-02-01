import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faQuestion, faFileDownload, faCloud, faSdCard } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { NotesApiService } from 'src/app/services/notes-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MinhasAnotacoesComponent implements OnInit {

  faPlus = faPlus;
  faQuestion = faQuestion;
  faFileDownload = faFileDownload;

  local: boolean = true;
  faCloud = faCloud;
  faSdCard = faSdCard;

  isLogged: boolean = false;

  localNotes: Note[] = [];
  userNotes: Note[] = [];

  constructor(
    private localStoredNotes: LocalStorageService,
    private notesApiService: NotesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.findAllLocalStorage();
    this.authService.isLogged.subscribe(res => {
      this.isLogged = res;

      if (this.isLogged) {
        this.notesApiService.get_notes()
          .subscribe((res: Note[]) => { this.userNotes = res; this.isLogged = true; this.local = false });  
      }
    })
  }

  findAllLocalStorage() {
    this.localNotes = this.localStoredNotes.findAll();
  }

  editNote(e) {
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }

  alternarTabela(value: boolean) {
    this.local = value;
  }
}
