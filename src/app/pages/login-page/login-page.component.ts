import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
          // Validators.minLength(this.passwordMinLength),
        ]),
      ],
    });

    this.signupForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.usernameMinLength),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.passwordMinLength),
        ]),
      ],
    });
  }

  loginBtnClick(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.loginService.loginUser(this.loginForm.value)
      .subscribe({
        next: res => {
          alert('Успешная авторизация')
        },
        error: err => {
          alert(err.error.message)
        }
      })
    }
  }

  registerBtnClick(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      this.loginService.registerUser(this.signupForm.value)
      .subscribe({
        next: res => {
          alert('Успешная регистрация')
        },
        error: err => {
          alert(err.error.message)
          console.log(err)
        }
      })
    }
  }
}
