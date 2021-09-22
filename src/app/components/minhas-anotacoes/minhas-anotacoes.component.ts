import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.css']
})
export class MinhasAnotacoesComponent implements OnInit {

  faPlus = faPlus;

  notes: Note[];

  constructor(
    private localStoredNotes: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllLocalStorage();
  }

  findAllLocalStorage() {
    this.notes = this.localStoredNotes.findAll();
  }

  editNote(e) {
    console.log(e);
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }
}
