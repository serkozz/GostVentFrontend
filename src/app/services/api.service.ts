import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get<any>(url)
  }
}
