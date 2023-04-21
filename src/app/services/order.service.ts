import { Order } from './../types/order';
import { ProductType } from './../types/productType';
import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_ADDRESS } from './../types/constants';
import { Injectable } from '@angular/core';
import { OrderFileInfo } from '../types/fileInfo';
import { OrderRating } from '../types/orderRating';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = BACKEND_BASE_ADDRESS + "order"
  constructor(private http: HttpClient) { }

  createOrder(order: FormData, orderName: string, productType: ProductType, clientEmail: string) {
    orderName = this.createOrderName(orderName, productType, clientEmail)
    console.log(order)
    return this.http.post<any>(this.url + `?orderName=${orderName}`, order)
  }

  deleteOrder(order: Order, email: string) {
    return this.http.delete<Order>(this.url + `?email=${email}&orderName=${order.name}`)
  }

  deleteOrderFile(orderFileInfo: OrderFileInfo) {
    return this.http.delete<any>(BACKEND_BASE_ADDRESS + "order/files",
    {
      body: orderFileInfo
    })
  }

  getOrderRating(order: Order, email: string) {
    return this.http.get<OrderRating>(this.url + `/rating?email=${email}&orderName=${order.name}`)
  }

  rateOrder(order: Order, email: string, rating: OrderRating) {
    return this.http.post<any>(this.url + `/rate?email=${email}&orderName=${order.name}`, {
      Rating: rating.rating,
      Review: rating.review
    })
  }

  addOrderFiles(orderFiles: FormData, order: Order, email: string) {
    let orderCreationDate: Date = new Date(order.creationDate)
    return this.http.post<any>(BACKEND_BASE_ADDRESS + "order/files" + `?email=${email}&orderName=${order.name}_${ProductType[order.productType]}_${orderCreationDate.toLocaleDateString("ru-RU")}`, orderFiles)
  }

  getOrderFiles(order: Order, email: string) {
    let orderCreationDate: Date = new Date(order.creationDate)
    return this.http.get<OrderFileInfo[]>(BACKEND_BASE_ADDRESS + "order/files/" + `?email=${email}&orderName=${order.name}_${ProductType[order.productType]}_${orderCreationDate.toLocaleDateString("ru-RU")}`)
  }

  private createOrderName(orderName: string, productType: ProductType, email: string): string {
    let currentDate: Date = new Date()
    console.log()
    return `${email}_${orderName}_${ProductType[productType]}_${currentDate.toLocaleDateString("ru-RU")}`
  }

  getOrders() {
    return this.http.get<Array<any>>(this.url + "s");
  }

  getOrdersByEmail(email: string) {
    return this.http.get<Order[]>(this.url + `?email=${email}`)
  }
}