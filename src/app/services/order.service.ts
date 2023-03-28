import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = BACKEND_BASE_ADDRESS + "order"
  constructor(private http: HttpClient) { }

  createOrder(order: FormData, orderName: string, clientEmail: string) {
    console.log(orderName);
    orderName = this.createOrderName(orderName, clientEmail)
    return this.http.post<any>(this.url + `?orderName=${orderName}`, order)
  }

  private createOrderName(orderName: string, email: string): string {
    let currentDate: Date = new Date()
    return `${email}_${orderName}_${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`
  }
}