import { Component } from '@angular/core';
import { AuthenticationService, UserDto } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { AvatarService } from '../../service/avatar.service';
import { Avatar } from 'src/app/model/avatar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  protected readonly faPenToSquare=faPenToSquare;
  
  constructor(private authenticationService: AuthenticationService,private router:Router,
    private avatarService: AvatarService
    ){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.getCurrentUser();
    this.getUserAvatar();
  }

  currentUser:UserDto=new UserDto();
  userAvatar:Avatar={} as Avatar;

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
    getUserAvatar(){
      this.avatarService.getCurrentUserAvatar().subscribe({
        next: (response) => {
          this.userAvatar=response.data;
          console.log(this.userAvatar,"avatar");
        },
        error: (e) => console.error(e)
      });
    }
  }

