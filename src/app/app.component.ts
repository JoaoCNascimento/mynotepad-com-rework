import { Component, OnInit } from '@angular/core';
import { faBars, faDoorOpen, faMoon, faSignInAlt, faStickyNote, faSun, faTimes, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { LocalStorageService } from './services/local-storage.service';

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

  faMoon = faMoon;
  faSun = faSun;

  title = 'Mynotepad';

  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    public localStorageService: LocalStorageService
  ) {

  }

  ngOnInit() {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    this.localStorageService.themeConfig();
    this.setCheckboxValue();
  }

  themeSwitch(e) {
    this.localStorageService.themeConfig();
  }

  setCheckboxValue() {
    let checkbox = $("#theme-switch");
  }

  logout() {
    this.authService.logout();
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
