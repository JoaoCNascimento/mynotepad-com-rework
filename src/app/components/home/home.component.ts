import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex = 0;
  images = [
    "assets/svgs/undraw_sorting_thoughts_re_fgli.svg",
    "assets/svgs/undraw_preparation_re_t0ce.svg",
    "assets/svgs/undraw_add_notes_re_ln36.svg"
  ];
  
  currentImage = this.images[0];

  constructor() { }

  ngOnInit(): void {
    this.imgSlideAnimation();
  }

  imgSlideAnimation() {
    setTimeout(() => {
      let img = document.querySelector('img');
      setTimeout(()=> {
        img.classList.remove("right-slide")
        img.classList.add("left-slide");
        setTimeout(() => {
          img.classList.remove("left-slide")
          img.classList.add("right-slide");
          this.slideIndex ++;
          img.src = this.images[this.slideIndex];
          
          if(this.slideIndex == 2) 
            this.slideIndex = -1
          this.imgSlideAnimation();
        }, 500);
      });
    }, 3000);
  }

}
