import {Component} from '@angular/core';
import {LoginService, UserDto} from "../service/login.service";
import { FormGroup, FormControl, Validators, Form} from '@angular/forms'
import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new UserDto();
  token: string = '';
  constructor(private loginService: LoginService,private formBuilder:FormBuilder) { }
  
  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      usernameInput: [''],
       passwordInput: ['']
     });
  }


  login() {

    this.user.username=this.loginForm.value.usernameInput;
    this.user.password=this.loginForm.value.passwordInput;
    
    this.loginService.login(this.user)
      .subscribe({
        next: (response) => this.token = response.data.token,
        error: (e) => console.error(e)
      }
      );
      
  }
}
