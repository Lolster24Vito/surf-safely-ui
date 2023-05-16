import {Component} from '@angular/core';
import {faClipboardQuestion, faCoffee, faHouse, faQuestion, faShield, faUser} from "@fortawesome/free-solid-svg-icons";

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
}
