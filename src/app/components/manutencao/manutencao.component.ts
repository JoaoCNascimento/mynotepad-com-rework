import { Component, OnInit } from '@angular/core';
import { faSmile, faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  faTools = faTools;
  faSmile = faSmile;

  constructor() { }

  ngOnInit(): void {
  }

}
