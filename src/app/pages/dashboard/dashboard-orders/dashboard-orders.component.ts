import { DashboardOrderInfoDialogComponent } from './dashboard-order-info-dialog/dashboard-order-info-dialog.component';
import { OrderStatus } from './../../../types/orderStatus';
import { ProductType } from './../../../types/productType';
import { lastValueFrom } from 'rxjs';
import { OrderService } from './../../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/types/order';
import Enumerable from 'linq';
import { ErrorInfo } from 'src/app/types/errorInfo';

@Component({
  selector: 'dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss'],
})

export class DashboardOrdersComponent {
  @Input() email: string = ''
  orderNameElementClassName: string = 'order-name'
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

  }

  async loadOrders() {
    return await lastValueFrom(this.orderService.getOrdersByEmail(this.email))
  }

  orderInfoClick(event: Event) {
    let orderNameElement = (event.target as HTMLElement).getElementsByClassName(`${this.orderNameElementClassName}`)[0]
    let orderName = orderNameElement.innerHTML
    console.log(orderName);
    let selectedOrder: Order | undefined = this.ordersList?.find(order => {
      order.name == orderName
      return order
    })

    if (selectedOrder == undefined)
    {
      this.toastr.error('Заказ не выбран', 'Неудача');
      return
    }

    let dialog = this.dialog.open(DashboardOrderInfoDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: {
        order: selectedOrder,
      },
    });

    dialog.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes == true)
          this.toastr.success('Заказ создан, отследить его статус можно на вкладке заказов', 'Успех');
      },
      error: (err: ErrorInfo) => this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка'),
    });
  }
}
