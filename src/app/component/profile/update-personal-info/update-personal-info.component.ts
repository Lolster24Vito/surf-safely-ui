import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeUserInformationDto } from 'src/app/model/change-user-information-dto';
import { AuthenticationService, UserDto } from 'src/app/service/authentication.service';
import { CurrentUserService } from 'src/app/service/current-user.service';

@Component({
  selector: 'app-update-personal-info',
  templateUrl: './update-personal-info.component.html',
  styleUrls: ['./update-personal-info.component.css']
})
export class UpdatePersonalInfoComponent {
  updatePersonalForm!: FormGroup;
  currentUser:UserDto=new UserDto();
  
  constructor(private authenticationService: AuthenticationService,private router:Router,
    private formBuilder:FormBuilder,private currentUserService:CurrentUserService
    ){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.getCurrentUser();
    this.updatePersonalForm=this.formBuilder.group({
      firstNameInput: [this.currentUser.firstName],
      lastNameInput: [this.currentUser.lastName],
      emailInput: [this.currentUser.email],
     });
  }


  getCurrentUser(){
     this.authenticationService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser=response.data;
        this.updatePersonalForm=this.formBuilder.group({
          firstNameInput: [this.currentUser.firstName],
          lastNameInput: [this.currentUser.lastName],
          emailInput: [this.currentUser.email],
         });
      },
      error: (e) => console.error(e)
    }
    );

    }
  updatePersonal(){
    let changeUserInfo:ChangeUserInformationDto={newFirstName: "", newLastName: "",newEmail: ""};
    changeUserInfo.newFirstName=this.updatePersonalForm.value.firstNameInput;
    changeUserInfo.newLastName=this.updatePersonalForm.value.lastNameInput;
    changeUserInfo.newEmail=this.updatePersonalForm.value.emailInput;
    this.currentUserService.changePersonalData(changeUserInfo).subscribe({
      next: (response) => {
       console.log(response,"next");
       this.router.navigate(['/profile']);
      },
      error: (e) => console.error(e)
    }
    );
  }

}
