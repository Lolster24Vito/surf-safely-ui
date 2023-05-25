import {Component} from '@angular/core';
import {faClipboardQuestion, faCoffee, faHouse, faQuestion, faShield, faUser,faSignOut} from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from '../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  protected readonly faCoffee = faCoffee;
  protected readonly faHouse = faHouse;
  protected readonly faShield = faShield;
  protected readonly faQuestion = faQuestion;
  protected readonly faClipboardQuestion = faClipboardQuestion;
  protected readonly faUser = faUser;
  protected readonly faSignOut = faSignOut;
  constructor(private loginService: AuthenticationService,private cookieService:CookieService){}
  logout(){
    this.loginService.logout().subscribe({
      next: (response) => {
          this.cookieService.delete('user_token');
      },
      error: (e) => console.error(e)
    }
    );
  }
  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }
}
