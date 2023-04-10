import { Injectable } from '@angular/core';
import { BACKEND_BASE_ADDRESS } from '../types/constants';
import { HttpClient } from '@angular/common/http';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url: string = BACKEND_BASE_ADDRESS + "payment"
  constructor(private http: HttpClient) { }

  public orderCheckout(order: Order, email: string) {
    return this.http.post<any>(this.url + "/pay" + `?orderName=${order.name}&email=${email}`,
    order)
  }
}
