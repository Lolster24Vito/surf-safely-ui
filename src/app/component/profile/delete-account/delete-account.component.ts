import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDto } from 'src/app/service/authentication.service';
import { CurrentUserService } from 'src/app/service/current-user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  constructor(private authenticationService: AuthenticationService,private router:Router,private currentUserService:CurrentUserService){

  }
  ngOnInit() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.getCurrentUser();
  }

  currentUser:UserDto=new UserDto();

  getCurrentUser(){
     this.authenticationService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser=response.data;
        console.log(this.currentUser);
      },
      error: (e) => console.error(e)
    }
    );

    }
  deleteAccount(){
    this.currentUserService.deleteAccount().subscribe({
      next: (response) => {
        console.log(response);
        this.authenticationService.logout();
        this.router.navigate(["login"]);
      },
      error: (e) => console.error(e)
    }
    );
  }
}
