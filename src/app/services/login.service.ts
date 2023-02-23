import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../types/userData';
import { UserDatabaseState } from '../types/userDatabaseState';
import { BACKEND_BASE_ADDRESS } from '../types/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  doesUserExists(userData: UserData): boolean {
    let url = BACKEND_BASE_ADDRESS + 'user/' + userData.email
    // console.log(url)
    let userDatabaseState = this.http.get<UserData>(url)
    let userExists: boolean = false
    userDatabaseState.subscribe(user => {
      user != null ? userExists = true : userExists = false
      console.log(`user: ${JSON.stringify(user)}, exists: ${userExists}`)
    })
    return userExists;
  }

  showConfig() {
    // this.configService.getConfig().subscribe(
    //   (data: Config) =>
    //     (this.config = {
    //       heroesUrl: data.heroesUrl,
    //       textfile: data.textfile,
    //       date: data.date,
    //     })
    // );
  }
}
