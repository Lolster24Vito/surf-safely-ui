import { Component } from '@angular/core';
import { AuthenticationService, UserDto } from '../../service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authenticationService: AuthenticationService,private router:Router){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
  ngOnInit() {
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
  }

