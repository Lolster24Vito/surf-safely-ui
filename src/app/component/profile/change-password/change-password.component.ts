import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService,
    private router:Router,
    private formBuilder:FormBuilder
    ){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
    
  }
  ngOnInit() {
    this.changePasswordForm=this.formBuilder.group({
      oldPassword: [],
      newPassword: []
     });
  }
  changePassword(){
    
    this.authenticationService.changePassword( this.changePasswordForm.value).subscribe({
      next: (response) => {
       console.log(response,"next");
       this.router.navigate(['/profile']);
      },
      error: (e) =>{ alert("incorrect password");}
    }
    );
  }
}
