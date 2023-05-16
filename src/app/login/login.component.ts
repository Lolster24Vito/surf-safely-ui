import {Component} from '@angular/core';
import {LoginService, UserDto} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new UserDto();
  token: string = '';

  constructor(private loginService: LoginService) { }

  login(): void {
    console.log(this.user)
    this.loginService.login(this.user)
      .subscribe({
        next: (response) => this.token = response.data.token,
        error: (e) => console.error(e),
      })
  }
}
