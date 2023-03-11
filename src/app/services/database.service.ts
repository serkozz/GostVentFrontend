import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public updateDatabase(action:DatabaseAction, data: Map<string,string>, table: string) {
    let body: string[] = []

    data.forEach((val, ind, map) => {
      body.push(val)
    })
    console.log(data)
    console.log(JSON.stringify(body))
    return this.http.post<any>(this.url + '/tables' + `?action=${action}&table=${table}`, body)
  }
}

export enum DatabaseAction {
  Post,
  Delete,
  Update
}
