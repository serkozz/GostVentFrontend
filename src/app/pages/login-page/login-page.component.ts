import { UserStoreService } from './../../services/userStore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private router: Router,
    private userStore: UserStoreService
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
      // console.log(this.loginForm.value)
      this.loginService.loginUser(this.loginForm.value)
      .subscribe({
        next: res => {
          this.toastr.success('Переходим в личный кабинет!', 'Успешная авторизация');
          console.log('Login success')
          console.log(res)

          this.loginService.storeToken(res.token)
          const userTokenPayload = this.loginService.decodeToken()
          this.userStore.setUsername(userTokenPayload.unique_name)
          this.userStore.setRole(userTokenPayload.role)

          this.router.navigate(['/dashboard'])
        },
        error: err => {
          this.toastr.error(`${err.error.message}`, `Неудачная авторизация`);
          console.log('Login failed')
          console.log(err.error)
        }
      })
    }
  }

  registerBtnClick(): void {
    if (this.signupForm.valid) {
      // console.log(this.signupForm.value)
      this.loginService.registerUser(this.signupForm.value)
      .subscribe({
        next: res => {
          this.toastr.success('Переходим в личный кабинет!', 'Успешная регистрация');
          console.log('Register success')
          console.log(res)
          this.router.navigate(['/'])
        },
        error: err => {
          this.toastr.error(`${err.error.message}`, `Неудачная регистрация`);
          console.log('Register failed')
          console.log(err.error)
        }
      })
    }
  }
}
