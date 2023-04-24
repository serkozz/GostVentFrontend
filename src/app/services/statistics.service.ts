import { Injectable } from '@angular/core';
import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '../types/utilityFuncs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private url: string = BACKEND_BASE_ADDRESS + "statistics"
  constructor(private http: HttpClient) { }

  public getStatisticsByDate(date: Date) {
    console.log(this.url + `?fromDate=${formatDate(date)}`);
    return this.http.get<any>(this.url + `?fromDate=${formatDate(date)}`)
  }

  public getStatisticsByDateRange(from: Date, to: Date) {
    console.log(this.url + `?fromDate=${formatDate(from)}&toDate=${formatDate(to)}`);
    return this.http.get<any>(this.url + `?fromDate=${formatDate(from)}&toDate=${formatDate(to)}`)
  }

  public updateStatistics() {
    return this.http.post<any>(this.url, { })
  }
}
