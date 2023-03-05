import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any): Observable<any> {
    let url: string = BACKEND_BASE_ADDRESS + 'register';
    return this.http.post<any>(url, user);
  }

  loginUser(user: any): Observable<any> {
    let url: string = BACKEND_BASE_ADDRESS + 'login'
    return this.http.post<any>(url, user)
  }

  logoutUser(): void {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  storeToken(tokenValue: string): void {
    localStorage.setItem('token', tokenValue)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLogedIn(): boolean {
    // !! returns true if value exists
    return !!localStorage.getItem('token')
  }
}
