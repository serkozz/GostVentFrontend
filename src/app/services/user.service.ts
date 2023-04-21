import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private url: string = BACKEND_BASE_ADDRESS + "users"
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Array<any>>(this.url);
  }

  createUser(user: any) {
    return this.http.post(this.url, JSON.stringify(user));
  }
  updateUser(user: any) {
    return this.http.put(this.url, JSON.stringify(user));
  }
  deleteUser(id: any) {
    return this.http.delete(this.url + '/' + id);
  }

  sendRestoreConfirmationCode(email: string) {
    return this.http.post(BACKEND_BASE_ADDRESS + `user/password/restore?email=${email}`, {

    })
  }

  restorePassword(email: string, confirmationKey: string, newPassword: string, newPasswordRepeated: string) {
    return this.http.post(BACKEND_BASE_ADDRESS + `user/password/restore/confirm?confirmationCode=${confirmationKey}`, {
        email: email,
        oldPassword: '',
        newPassword: newPassword,
        newPasswordRepeated: newPasswordRepeated })
    }

  changePassword(email: string, oldPassword: string, newPassword: string, newPasswordRepeated: string) {
    return this.http.post(BACKEND_BASE_ADDRESS + 'user/password/change',{
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordRepeated: newPasswordRepeated })
    }

  deleteAccount(email: string) {
    return this.http.delete(BACKEND_BASE_ADDRESS + `user/delete?email=${email}`);
  }
}
