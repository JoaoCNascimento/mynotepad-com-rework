import { Component, OnInit } from '@angular/core';
import { faBars, faDoorOpen, faSignInAlt, faStickyNote, faTimes, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  faUser = faUser;
  faNotes = faStickyNote;
  faDoorOpen = faDoorOpen;
  faSignIn = faSignInAlt;
  faUserPlus = faUserPlus;
  faBars = faBars;
  faTimes = faTimes;

  title = 'Mynotepad';

  isLogged: boolean = false;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    console.log('working')
    this.authService.showMenu.subscribe(
      logged => this.isLogged = logged
    )
  }

  /*
    ________________________________
    **********  JQUERY *************
    As funções abaixo servem apenas para estilização da página.
    ** ajustarNavbar **
    Serve para ajustar a navbar de acordo com o tamanho da janela.
    **esconderMenu / revelarMenu**
    Exatamente o que está descrito.
  */

  adjustSize() {
    $(window).resize(() => {
      if ($(window).width() > 900) {
        let menu = $(".aside");

        menu.css("display", "flex");
      }
    })
  }

  hideMenu() {
    $(document).ready(() => {
      $("#close-btn").click(() => {
        let menu = $(".aside");

        $("#close-btn").hide();
        menu.animate({ right: -400 }, 'fast')
      })
    })
  }

  showMenu() {
    $(document).ready(() => {
      $("#hamburguer").click(() => {
        let menu = $(".aside");
        let closebtn = $("#close-btn");

        menu.animate({ right: 0 }, 'fast')
        closebtn.show();
        menu.css("display", "flex");
      })
    })
  }
}
