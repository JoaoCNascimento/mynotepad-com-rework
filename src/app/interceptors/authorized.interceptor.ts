import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizedInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    let cookie = this.cookie.get('jwt');

    if (cookie) {
      this.authService.authenticated = true;
      this.authService.showMenu.next(true);
    } else {
      this.authService.authenticated = false;
      this.authService.showMenu.next(false);
    }

    return next.handle(request);
  }
}
