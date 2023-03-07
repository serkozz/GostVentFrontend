import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = "http://localhost:5072/users"
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
}
