import { Component } from '@angular/core';
import { AuthenticationService, UserDto } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { AvatarService } from '../../service/avatar.service';
import { Avatar } from 'src/app/model/avatar';
import { CurrentUserService } from '../../service/current-user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  protected readonly faPenToSquare=faPenToSquare;
  
  constructor(private authenticationService: AuthenticationService,private router:Router,
    private avatarService: AvatarService,private currentUserService:CurrentUserService
    ){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.getCurrentUser();
    this.getUserAvatar();
    this.getUserPoints();
  }

  currentUser:UserDto=new UserDto();
  userAvatar:Avatar={} as Avatar;
  currentPoints!:number;
  totalPoints!:number;

  getCurrentUser(){
     this.authenticationService.getCurrentUser().subscribe({
      next: (response) => {
        console.log(response,"currentUserResponse");
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
    getUserPoints(){
      this.currentUserService.getCurrentUserPoints().subscribe({
        next: (response) => {
          this.currentPoints=response.data.score;
          this.totalPoints=response.data.money;

          console.log(this.userAvatar,"avatar");
        },
        error: (e) => console.error(e)
      });
    }
  }

