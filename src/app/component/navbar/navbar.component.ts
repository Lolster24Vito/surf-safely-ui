import {Component, OnInit} from '@angular/core';
import {faClipboardQuestion, faCoffee, faHouse, faQuestion, faShield, faUser,faSignOut, faRankingStar} from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from '../../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserService } from '../../service/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  protected readonly faCoffee = faCoffee;
  protected readonly faHouse = faHouse;
  protected readonly faShield = faShield;
  protected readonly faQuestion = faQuestion;
  protected readonly faClipboardQuestion = faClipboardQuestion;
  protected readonly faUser = faUser;
  protected readonly faSignOut = faSignOut;
  protected readonly faRankingStar=faRankingStar;
  userPoints:number=0;
  constructor(private loginService: AuthenticationService,
    private cookieService:CookieService,private currentUserService:CurrentUserService){
   
  }
  ngOnInit(): void {
    this.currentUserService.getCurrentUserPoints().subscribe({
      next:(response)=>{
        console.log(response);
      this.userPoints = response.data.money;
    },
    error:(e)=>console.error(e)
  }
    );
  }
  logout(){
    this.loginService.logout().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => console.error(e)
    }
    );
  }
  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }
}
