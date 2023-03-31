import { OrderStatus } from './../../../types/orderStatus';
import { ProductType } from './../../../types/productType';
import { lastValueFrom } from 'rxjs';
import { OrderService } from './../../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss'],
})

export class DashboardOrdersComponent {
  @Input() email: string = ''
  ordersLoaded: boolean = false
  ordersList: Order[] | null = null
  public productType = ProductType;
  public orderStatus = OrderStatus;

  constructor(private toastr: ToastrService, private orderService: OrderService, private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.ordersList = await this.loadOrders()

    if (this.ordersList != null)
      this.ordersLoaded = true

    console.log(this.ordersList)
  }

  async loadOrders() {
    return await lastValueFrom(this.orderService.getOrdersByEmail(this.email))
  }

  orderInfoClick(event: Event) {
    console.log("Clicked");

    // Open new dialog box
  }
}
