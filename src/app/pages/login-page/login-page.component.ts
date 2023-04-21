import { UserStoreService } from './../../services/userStore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { PasswordManipulationsDialogComponent } from '../dashboard/password-manipulations-dialog/password-manipulations-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private userStore: UserStoreService,
    private dialog: MatDialog
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
      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.toastr.success(
            'Переходим в личный кабинет!',
            'Успешная авторизация'
          );
          console.log('Login success');

          this.loginService.storeToken(res.token);
          const userTokenPayload = this.loginService.decodeToken();
          this.userStore.setUsername(userTokenPayload.unique_name);
          this.userStore.setRole(userTokenPayload.role);
          this.userStore.setEmail(userTokenPayload.email);

          this.router.navigate(['/dashboard']);
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(`${err.message}`, `Неудачная авторизация`);
          console.log(err.message);
        },
      });
    }
  }

  restoreBtnClick(passwordManipulationType: 'change' | 'restore') {
      let email: string = this.loginForm.controls['email'].value
      let dialog = this.dialog.open(PasswordManipulationsDialogComponent, {
        minWidth: '200px',
        maxWidth: '400px',
        data: {
          passwordManipulationType: passwordManipulationType,
          email: email
        },
      });

      dialog.afterClosed().subscribe({
        next: async (dialogRes: boolean) => {
          if (dialogRes == true) this.toastr.success('Заказ удален', 'Успех');
        },
        error: (err: ErrorInfo) =>
          this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка'),
      });
    }

  registerBtnClick(): void {
    if (this.signupForm.valid) {
      this.loginService.registerUser(this.signupForm.value).subscribe({
        next: (res) => {
          this.toastr.success(
            'Вам доступен личный кабинет!',
            'Успешная регистрация'
          );
          console.log('Register success');
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(`${err.message}`, `Неудачная регистрация`);
          console.log('Register failed');
        },
      });
    }
  }
}
