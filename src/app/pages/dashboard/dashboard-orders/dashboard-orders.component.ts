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
  @Input() email: string = '';
  @Input() role: 'Admin' | 'User' = 'User';
  ordersLoaded: boolean = false;
  ordersList: Order[] | null = null;
  public productType = ProductType;
  public orderStatus = OrderStatus;

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.ordersList = await this.loadOrders();

    if (this.ordersList != null) this.ordersLoaded = true;
  }

  async loadOrders() {
    return await lastValueFrom(this.orderService.getOrdersByEmail(this.email));
  }

  onFilterChange(event: KeyboardEvent) {
    let input: HTMLInputElement = event.target as HTMLInputElement;
    let ordersDivs = Array.from(document.getElementsByClassName('order-info'));

    for (let i = 0; i < ordersDivs.length; i++) {
      const div = ordersDivs[i] as HTMLElement
      const orderDetails: HTMLElement[] = Array.from(div.getElementsByClassName('order-detail')) as HTMLElement[]

      let match: boolean = Enumerable.from(orderDetails).any(
      (el) =>
          (el.innerText || el.innerHTML)
          .toLowerCase()
          .includes(input.value.toLowerCase())
      )

      if (match) (ordersDivs[i] as HTMLElement).style.display = 'flex'
      else (ordersDivs[i] as HTMLElement).style.display = 'none'
    }
  }

  orderInfoClick(event: Event) {
    let order = event.target as HTMLElement
    let orderDetails = order.getElementsByClassName('order-detail')

    if (order == undefined) {
      this.toastr.error('Заказ не выбран', 'Неудача');
      return;
    }

    if (this.ordersList == null)
      return

    let selectedOrder = Enumerable.from(this.ordersList).where(
      el => el.name == orderDetails[0].innerHTML
      ).toArray()[0]

    let dialog = this.dialog.open(DashboardOrderInfoDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: {
        order: selectedOrder,
      },
    })

    dialog.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes == true)
          this.toastr.success(
            'Заказ создан, отследить его статус можно на вкладке заказов',
            'Успех'
          );
      },
      error: (err: ErrorInfo) =>
        this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка'),
    });
  }
}
