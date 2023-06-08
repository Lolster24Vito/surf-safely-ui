import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserDto } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new UserDto();
  registerForm!: FormGroup;

  constructor(
    private loginService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.email]
    }, {
      validator: this.passwordMatchValidator // Custom validator for password matching
    });
  }
  register() {
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.email = this.registerForm.value.email;
    this.user.roleId = 1
    console.log(this.user);

    this.loginService.register(this.user)
      .subscribe({
        next: (response) => {
          // Handle successful registration, e.g., redirect to login page
          this.router.navigate(['/login']);
        },
        error: (e) => console.error(e)
      });
  }
   // Custom validator function for password matching
   passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ 'passwordMismatch': true });
    } else {
      if(confirmPasswordControl)
      confirmPasswordControl.setErrors({ 'passwordMismatch': false });
    }
  }
}
