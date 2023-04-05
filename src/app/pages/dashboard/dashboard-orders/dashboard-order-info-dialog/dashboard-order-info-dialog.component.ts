import { OrderStatus } from './../../../../types/orderStatus';
import { ProductType } from './../../../../types/productType';
import { OrderService } from './../../../../services/order.service';
import { Order } from './../../../../types/order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { dayTextForms, declDate, declNum } from 'src/app/types/utilityFuncs';

@Component({
  selector: 'dashboard-order-info-dialog',
  templateUrl: './dashboard-order-info-dialog.component.html',
  styleUrls: ['./dashboard-order-info-dialog.component.scss'],
})
export class DashboardOrderInfoDialogComponent {
  selectedOrder!: Order;
  orderFilesFetched: boolean = false;
  productType = ProductType
  orderStatus = OrderStatus
  dayTextForms = dayTextForms
  declNum = declNum
  declDate = declDate

  constructor(
    public dialogRef: MatDialogRef<DashboardOrderInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      order: Order;
    },
    public orderService: OrderService
  ) {
    this.selectedOrder = data.order;
  }
}
