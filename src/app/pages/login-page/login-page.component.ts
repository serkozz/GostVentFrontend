import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';
import {
  LoginService,
  LoginState,
  RegisterState,
} from 'src/app/services/login.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  passwordMinLength: number = 8;
  usernameMinLength: number = 5;

  signupForm!: FormGroup;
  loginForm!: FormGroup;

  userExists: boolean = true;
  alreadyRegistered: boolean = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.passwordMinLength),
        ]),
      ],
    });

    this.signupForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.usernameMinLength),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.passwordMinLength),
        ]),
      ],
    });
  }

  loginBtnClick(): void {
    if (this.loginForm.invalid) {
      this.userExists = false;
      return;
    }
    let user = new User(
      null,
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );
    console.log(`User ${JSON.stringify(user)} logged in`);
    let loginState: LoginState = this.loginService.loginUser(user);
    if (loginState == LoginState.LOGGED_IN) this.router.navigate(['/']);
  }

  registerBtnClick(): void {
    if (this.signupForm.invalid) return;
    let user = new User(
      this.signupForm.controls['username'].value,
      this.signupForm.controls['email'].value,
      SHA256(this.signupForm.controls['password'].value).toString()
    );
    let registerState: RegisterState = this.loginService.registerUser(user);
    if (registerState == RegisterState.REGISTERED) {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
      return;
    } else {
      this.alreadyRegistered = true;
      setTimeout(() => {
        this.alreadyRegistered = false;
      }, 3000);
    }
  }
}
