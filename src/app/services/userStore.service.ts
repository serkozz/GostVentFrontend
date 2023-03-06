import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _username = new BehaviorSubject<string>('');
  private _role = new BehaviorSubject<string>('');

  constructor() {}

  public getUsername() {
    return this._username.asObservable();
  }

  public setUsername(value: string) {
    this._username.next(value);
  }
  public getRole() {
    return this._role.asObservable();
  }

  public setRole(value: string) {
    this._role.next(value);
  }
}
