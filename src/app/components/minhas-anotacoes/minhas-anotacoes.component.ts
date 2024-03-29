import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NotesApiService } from 'src/app/services/notes-api.service';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.css']
})
export class MinhasAnotacoesComponent implements OnInit {

  faPlus = faPlus;

  isLogged = false;

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
    });
    this.notesApiService.get_notes().subscribe(
      (res:any) => {

        if(res.hasOwnProperty("notes")){
          return this.userNotes = res.notes;
        }

        return this.userNotes = [];
      }
    );
  }

  findAllLocalStorage() {
    this.localNotes = this.localStoredNotes.findAll();
  }

  editNote(e) {
    console.log(e);
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }
}
