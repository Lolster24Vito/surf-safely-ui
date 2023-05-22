import {Component} from '@angular/core';
import {LoginService} from "../service/login.service";
import {FormBuilder, FormGroup} from '@angular/forms'
import {UserDto} from "../../model/user-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserDto = {
    username: '',
    password: ''
  };
  token: string = '';

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
  }

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameInput: [''],
      passwordInput: ['']
    });
  }


  login() {

    this.user.username = this.loginForm.value.usernameInput;
    this.user.password = this.loginForm.value.passwordInput;

    this.loginService.login(this.user)
      .subscribe({
          next: (response) => {
            this.token = response.data.token;
            localStorage.setItem('user_token', this.token);
            //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

          },
          error: (e) => console.error(e)
        }
      );

  }
}
