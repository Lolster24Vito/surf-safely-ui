import {Component, OnInit} from '@angular/core';
import {faClipboardQuestion, faCoffee, faHouse, faQuestion, faShield, faUser,faSignOut, faRankingStar, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
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
  protected readonly faRightToBracket=faRightToBracket;
  userPoints:number=0;
  username:string="";
  constructor(private loginService: AuthenticationService,
    private cookieService:CookieService,private currentUserService:CurrentUserService){
   
  }
  ngOnInit(): void {
    if(this.loginService.isLoggedIn()==true){
      
      this.currentUserService.getCurrentUserPoints().subscribe({
        next:(response)=>{
          console.log(response);
          this.userPoints = response.data.money;
        },
        error:(e)=>{console.error(e);}
      }
      );
      this.currentUserService.getCurrentUser().subscribe({
        next:(response)=>{
          console.log(response.data.username);
          this.username=response.data.username;
        },
        error:(e)=>{console.error(e);}
      });
    }
  }
  logout(){
    this.loginService.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.cookieService.delete('user_token');
      },
      error: (e) => {
        console.error(e);
        this.cookieService.delete('user_token');
      
      }
    }
    );
  }
  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }
}
