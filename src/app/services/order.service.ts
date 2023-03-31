import { Order } from './../types/order';
import { ProductType } from './../types/productType';
import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = BACKEND_BASE_ADDRESS + "order"
  constructor(private http: HttpClient) { }

  createOrder(order: FormData, orderName: string, productType: ProductType, clientEmail: string) {
    orderName = this.createOrderName(orderName, productType, clientEmail)
    console.log(`ProductTypeInCreateOrderFunc: ${productType}`)
    console.log(orderName);
    return this.http.post<any>(this.url + `?orderName=${orderName}`, order)
  }

  private createOrderName(orderName: string, productType: ProductType, email: string): string {
    let currentDate: Date = new Date()
    return `${email}_${orderName}_${ProductType[productType]}_${currentDate.toLocaleDateString("ru-RU")}`
  }

  getOrdersByEmail(email: string) {
    return this.http.get<Order[]>(this.url + `?email=${email}`)
  }
}