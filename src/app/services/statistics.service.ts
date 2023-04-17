import { Injectable } from '@angular/core';
import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private url: string = BACKEND_BASE_ADDRESS + "statistics"
  constructor(private http: HttpClient) { }

  public getStatistics() {
    return this.http.get<any>(this.url)
  }

  public updateStatistics() {
    return this.http.post<any>(this.url, {

    })
  }
}
