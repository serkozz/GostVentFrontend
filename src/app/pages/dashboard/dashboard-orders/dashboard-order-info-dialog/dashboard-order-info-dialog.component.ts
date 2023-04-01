import { OrderService } from './../../../../services/order.service';
import { Order } from './../../../../types/order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dashboard-order-info-dialog',
  templateUrl: './dashboard-order-info-dialog.component.html',
  styleUrls: ['./dashboard-order-info-dialog.component.scss']
})
export class DashboardOrderInfoDialogComponent {

  selectedOrder!: Order
  constructor(
    public dialogRef: MatDialogRef<DashboardOrderInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      order: Order
    },
    public orderService: OrderService
  ) {
    this.selectedOrder = data.order
  }
}
