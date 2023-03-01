import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';
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
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      // let hashedPassword = SHA256(this.loginForm.controls['password'].value).toString()
      // this.loginForm.controls['password'].setValue(hashedPassword)
      this.loginService.loginUser(this.loginForm.value)
      .subscribe({
        next: res => {
          alert('Успешная авторизация')
        },
        error: err => {
          alert('Неудачная авторизация')
        }
      })
    }
  }

  registerBtnClick(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      // let hashedPassword = SHA256(this.signupForm.controls['password'].value).toString()
      // this.signupForm.controls['password'].setValue(hashedPassword)
      this.loginService.registerUser(this.signupForm.value)
      .subscribe({
        next: res => {
          alert('Успешная аутентификация')
        },
        error: err => {
          alert('Неудачная аутентификация')
        }
      })
    }
  }
}
