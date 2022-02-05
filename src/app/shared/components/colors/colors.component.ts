import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  @Input() showParagraph = true;
  @Output() color: EventEmitter<any> = new EventEmitter<any>();

  colors = [
    { value: "blue" },
    { value: "yellow" },
    { value: "red" },
    { value: "green" },
    { value: "pink" },
    { value: "orange" },
    { value: "white" },
    { value: "black" }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  colorChange(e) {
    // console.log(e.target.className);
    return this.color.emit(e.target.className);
  }
}
