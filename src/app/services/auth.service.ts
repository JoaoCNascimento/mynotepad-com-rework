import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  showMenu = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }

  login() {
    if (this.cookie.get('jwt')) {
      this.authenticated = true;
      this.showMenu.emit(true);
    }
    else {
      this.authenticated = false;
      this.showMenu.emit(false);
    }
  }

  checkAuthentication() {
    return this.authenticated;
  }
}
