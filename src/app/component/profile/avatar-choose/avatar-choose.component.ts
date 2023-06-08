import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from 'src/app/model/avatar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AvatarService } from 'src/app/service/avatar.service';

@Component({
  selector: 'app-avatar-choose',
  templateUrl: './avatar-choose.component.html',
  styleUrls: ['./avatar-choose.component.css']
})
export class AvatarChooseComponent implements OnInit {
userAvatars!:Avatar[];
avatarsToBuy!:Avatar[];
errorMessage:string = "";
constructor(private avatarService: AvatarService,private authService:AuthenticationService,private router:Router
  ){
    if (!authService.isLoggedIn()) {
      router.navigate(['login']);
    }
    this.getCurrentUserAvatars();
}
ngOnInit(): void {
  
}
private getCurrentUserAvatars() {
  this.avatarService.getCurrentUserAvatars().subscribe({
    next: (response) => {
      this.userAvatars=response.data;
      console.log(response,"userAvatars");
      this.getAvatarsToBuy();
    },
    error: (e) => console.error(e)
  }
  );
}
private getAvatarsToBuy(){
  this.avatarService.getAllAvatars().subscribe({
    next: (response) => {
      this.avatarsToBuy=response.data;
      for(let i=0;i<this.userAvatars.length;i++){
        let id=this.userAvatars.at(i)?.id;
        let foundAvatarToBuy=this.avatarsToBuy.find(a=>a.id==id);
        if(foundAvatarToBuy){
          let indexOfId=this.avatarsToBuy.indexOf(foundAvatarToBuy);
          this.avatarsToBuy.splice(indexOfId,1);
        }
      }
      console.log(this.avatarsToBuy,"allAvatars to buy");

    },
    error: (e) => console.error(e)
  }
  );
}
 buyAvatar(id:number){
  this.avatarService.buyAvatar(id).subscribe({
    next: (response) => {
      if(response.error.length>0){
        this.errorMessage = response.error;
      }
    },
    error: (e) => console.error(e)
  }
  );
}
setProfilePicture(id:number){
  this.avatarService.makeMainAvatar(id).subscribe({
    next: (response) => {
      if(response.error.length>0){
        this.errorMessage = response.error;
      }
      console.log(response,"make main");
    },
    error: (e) => console.error(e)
  }
  );
}
}
