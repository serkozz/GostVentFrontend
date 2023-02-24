import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../types/user';
import { BACKEND_BASE_ADDRESS } from '../types/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  registerUser(userData: User): RegisterState {
    let url = BACKEND_BASE_ADDRESS + 'register';
    let serverResponse = this.http.post<User>(url, userData);
    let registeredUser!: User | null;
    serverResponse.subscribe((responseBody) => {
      registeredUser = new User(
        responseBody.username,
        responseBody.email,
        responseBody.password
      );
    });
    console.log(`${JSON.stringify(registeredUser)}`);
    setTimeout(() => {
      if (registeredUser != null) {
        console.log(
          `user: ${JSON.stringify(registeredUser)} successfully registered`
        );
        return RegisterState.REGISTERED;
      } else return RegisterState.ALREADY_EXISTS;
    }, 3000);
    return RegisterState.REGISTERED;
  }

  loginUser(userData: User): LoginState {
    // let url = BACKEND_BASE_ADDRESS + 'login'
    // let serverResponse = this.http.post(url, userData)
    // serverResponse.subscribe(user => {
    //   console.log(`user: ${JSON.stringify(user)}`)
    // })
    return LoginState.LOGGED_IN;
  }
}

export enum RegisterState {
  REGISTERED,
  ALREADY_EXISTS,
}

export enum LoginState {
  USER_DOESNT_EXISTS,
  LOGGED_IN,
}
