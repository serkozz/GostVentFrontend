import { OrderStatus } from './../../../../types/orderStatus';
import { ProductType } from './../../../../types/productType';
import { OrderService } from './../../../../services/order.service';
import { Order } from './../../../../types/order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { dayTextForms, declDate, declNum } from 'src/app/types/utilityFuncs';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dashboard-order-info-dialog',
  templateUrl: './dashboard-order-info-dialog.component.html',
  styleUrls: ['./dashboard-order-info-dialog.component.scss'],
})
export class DashboardOrderInfoDialogComponent {
  selectedOrder!: Order
  email!: string
  orderFilesFetched: boolean = false
  productType = ProductType
  orderStatus = OrderStatus
  dayTextForms = dayTextForms
  declNum = declNum
  declDate = declDate

  constructor(
    public dialogRef: MatDialogRef<DashboardOrderInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      order: Order
      email: string
    },
    public orderService: OrderService,
    public toastr: ToastrService
  ) {
    this.selectedOrder = data.order
    this.email = data.email
  }

  orderDeleteBtnClick() {
    this.orderService.deleteOrder(this.selectedOrder, this.email).subscribe(
      {
        next: (val) => {
          console.log(val)
          this.dialogRef.close(true)
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка')
          this.dialogRef.close(false)
        }
      }
    )
  }
}
