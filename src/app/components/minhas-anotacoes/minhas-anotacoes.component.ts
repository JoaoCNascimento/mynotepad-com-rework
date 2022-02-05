import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faQuestion, faFileDownload, faCloud, faSdCard, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  faTimes = faTimes;

  local: boolean = true;
  faCloud = faCloud;
  faSdCard = faSdCard;

  faFilter = faFilter;

  title = "";
  color = "";

  isLogged: boolean = false;

  localNotes: Note[] = [];
  userNotes: any = [];

  userNotesFilter: any = [];
  localNotesFilter: Note[] = [];


  constructor(
    private localStoredNotes: LocalStorageService,
    private notesApiService: NotesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.findAllLocalStorage();
    this.authService.isLogged.subscribe(res => {
      this.isLogged = res;

      if (this.isLogged) {
        this.notesApiService.get_notes()
          .subscribe((res) => { this.userNotes = res.notes; this.userNotesFilter = this.userNotes; this.isLogged = true; this.local = false });  
      }
    });
  }

  findAllLocalStorage() {
    this.localNotes = this.localStoredNotes.findAll();
    this.localNotesFilter = this.localNotes;
  }

  editNote(e) {
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }

  alternarTabela(value: boolean) {
    this.local = value;
  }

  titleFilter(e) {  
    if(this.title == null || this.title == ""){
      this.localNotesFilter = this.localNotes;
      this.userNotesFilter = this.userNotes;
      return;
    }
    
    if(this.color != "" && this.color != null) {
      this.localNotesFilter = this.localNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()) && note.color.split(' ')[0] === this.color);
      this.userNotesFilter = this.userNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()) && note.color.split(' ')[0] === this.color);
      return;
    }

    this.localNotesFilter = this.localNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()));
    this.userNotesFilter = this.userNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()));
  }

  setColor(e) {
    this.color = e;

    if(this.title != null || this.title != "") {
      this.localNotesFilter = this.localNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()) && note.color.split(' ')[0] === this.color);
      this.userNotesFilter = this.userNotes.filter(note => note.title.toLowerCase().includes(this.title.toLowerCase()) && note.color.split(' ')[0] === this.color);
      return;
    }

    this.localNotesFilter = this.localNotes.filter(note => note.color.split(' ')[0] === this.color);
    this.userNotesFilter = this.userNotes.filter(note => note.color.split(' ')[0] === this.color);
  }

  clearFilters() {
    this.localNotesFilter = this.localNotes;
    this.userNotesFilter = this.userNotes;
    this.color = "";
  }
}
