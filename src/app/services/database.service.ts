import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseAction } from '../types/databaseAction';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url: string = "http://localhost:5072/database"
  constructor(private http: HttpClient) { }

  public getTables() {
    return this.http.get<Array<any>>(this.url + '/tables')
  }

  public getTests() {
    return this.http.get<Array<any>>(this.url + '/tables/tests')
  }

  // http://localhost:5072/database/tables?action=2&table=User

  public performAction(action:DatabaseAction, data: Map<string,string>, table: string) {
    let body: string[] = []
    data.forEach((val, ind, map) => {
      body.push(val)
    })
    let url: string = this.url + '/tables' + `?action=${action}&table=${table}`
    console.log("Url")
    console.log(url)
    console.log("Data")
    console.log(data)
    console.log(JSON.stringify(body))

    switch (action) {
      case DatabaseAction.Update:
        this.http.put<any>(url, body).subscribe(
          res => console.log(res))
        break
      case DatabaseAction.Delete:
        this.http.delete<any>(url, {
          body: body}).subscribe(res => console.log(res))
        break
      case DatabaseAction.Post:
        this.http.post<any>(url, body).subscribe(res => console.log(res))
        break
    }
  }
}
