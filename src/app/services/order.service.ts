import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = BACKEND_BASE_ADDRESS + "order"
  constructor(private http: HttpClient) { }

  createOrder(order: any) {
    console.log(order);

    return this.http.post<any>(this.url, order)
  }
}
