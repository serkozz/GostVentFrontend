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
}
