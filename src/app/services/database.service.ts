import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseAction } from '../types/databaseAction';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url: string = BACKEND_BASE_ADDRESS + "database"
  constructor(private http: HttpClient) { }

  public getTables() {
    return this.http.get<Array<any>>(this.url + '/tables')
  }

  public getTests() {
    console.log(this.url + '/tables/tests')
    return this.http.get<Array<any>>(this.url + '/tables/tests')
    // https://3efe-80-234-76-34.eu.ngrok.io/database/tables/tests
  }

  // http://localhost:5072/database/tables?action=2&table=User

  public performAction(action:DatabaseAction, data: Map<string,string>, table: string) {
    let body: string[] = []
    data.forEach((val, ind, map) => {
      body.push(val)
    })
    let url: string = this.url + '/tables' + `?action=${action}&table=${table}`

    switch (action) {
      case DatabaseAction.Update:
        return this.http.put<any>(url, body)
      case DatabaseAction.Delete:
        return this.http.delete<any>(url, {body: body})
      case DatabaseAction.Post:
        return this.http.post<any>(url, body)
    }
  }
}
