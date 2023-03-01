import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

import { User } from '../types/user';
import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { ErrorInfo } from '../types/errorInfo';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    let url = BACKEND_BASE_ADDRESS + 'register';
    return this.http.post<any>(url, user);
  }

  loginUser(user: any) {
    let url = BACKEND_BASE_ADDRESS + 'login'
    return this.http.post<any>(url, user)
  }
}
