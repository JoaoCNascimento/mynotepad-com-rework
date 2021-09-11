import { Component } from '@angular/core';
import { faDoorOpen, faNotesMedical, faSignature, faSignInAlt, faStickyNote, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  faUser = faUser;
  faNotes = faStickyNote;
  faDoorOpen = faDoorOpen;
  faSignIn = faSignInAlt;
  faUserPlus = faUserPlus;

  title = 'Mynotepad';

  isLogged: boolean = false;
}
