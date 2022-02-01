import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit, OnChanges {

  faPlus = faPlus;

  @Input() notes: Note[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (<Note[]>changes.notes.currentValue.notes) {
      this.notes = <Note[]>changes.notes.currentValue.notes
    }
    else {
      this.notes = <Note[]>changes.notes.currentValue;
    }
  }

  editNote(e) {
    this.router.navigate(['editar-anotacao', e], { relativeTo: this.route });
  }
}
