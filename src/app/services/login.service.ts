import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'
import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userTokenPayload: any

  constructor(private http: HttpClient,
    private router: Router) {
      this.userTokenPayload = this.decodeToken()
    }

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

  clearToken() {
    localStorage.removeItem('token')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService()
    const token = this.getToken()!
    return jwtHelper.decodeToken(token)
  }

  getUsernameFromToken() {
    if (this.userTokenPayload)
      return this.userTokenPayload.unique_name
  }

  getRoleFromToken() {
    if (this.userTokenPayload)
      return this.userTokenPayload.role
  }

  getEmailFromToken() {
    if (this.userTokenPayload)
      return this.userTokenPayload.email
  }

  isLogedIn(): boolean {
    // !! returns true if value exists
    return !!localStorage.getItem('token')
  }
}
