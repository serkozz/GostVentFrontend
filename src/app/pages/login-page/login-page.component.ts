import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserData } from 'src/app/types/userData';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  regName: string = '';
  regEmail: string = '';
  regPassword: string = '';

  logEmail: string = '';
  logPassword: string = '';

  constructor(private loginService: LoginService) {

  }

  isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }

  loginBtnClick(): UserData {
    let user = new UserData(null, this.logEmail, this.logPassword);
    let isValidEmail = this.isValidEmail(this.logEmail);
    // console.log(
    //   `User ${JSON.stringify(user)} LOGGED IN. Email was valid: ${isValidEmail}`
    // );
    this.loginService.doesUserExists(user)
    return user;
  }

  registerBtnClick() {
    let user = new UserData(this.regName, this.regEmail, this.regPassword);
    let isValidEmail = this.isValidEmail(this.regEmail);
    let isValidPasswordLength: boolean = this.regPassword.length > 8

    // console.log(
    //   `User ${JSON.stringify(
    //     user
    //   )} REGISTERED. Email was valid: ${isValidEmail}`
    // );

    return user;
  }
}
