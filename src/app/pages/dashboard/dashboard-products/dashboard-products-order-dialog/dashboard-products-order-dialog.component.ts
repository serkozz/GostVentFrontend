import { ToastrService } from 'ngx-toastr';
import { ProductType } from '../../../../types/productType';
import { OrderService } from './../../../../services/order.service';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorInfo } from 'src/app/types/errorInfo';

@Component({
  selector: 'dashboard-products-order-dialog',
  templateUrl: './dashboard-products-order-dialog.component.html',
  styleUrls: ['./dashboard-products-order-dialog.component.scss']
})
export class DashboardProductsOrderDialogComponent {
  orderName: string = ''
  productType: ProductType
  fileList: File[] = []
  orderCreating: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DashboardProductsOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productName: string,
      productType: ProductType
      email: string
    },
    public orderService: OrderService,
    public toastr: ToastrService
  ) {
    this.productType = data.productType
  }


  onInputChange(event: Event) {
    this.fileList = []
    let files = (event.target as HTMLInputElement).files!
    for (let i = 0; i < files.length; i++) {
      this.fileList.push(files[i])
    }
    console.log(this.fileList)
  }

  orderBtnClick(event: Event) {
    let orderData: FormData = new FormData()
    this.fileList.forEach(file => {
      orderData.append('test', file, file.name)
    });

    if (this.orderName.length > 20)
    {
      this.toastr.error("Имя заказа должно быть короче 20 символов", "Ошибка")
      return
    }

    if (this.orderName.includes('_'))
    {
      this.toastr.error("Имя заказа не должно содержать символа '_'", "Ошибка")
      return
    }
    this.orderCreating = true

    this.orderService.createOrder(orderData, this.orderName, this.productType, this.data.email).subscribe(
      {
        next: (val) => {
          this.orderCreating = false
          this.dialogRef.close(true)
        },
        error: (err: ErrorInfo) => {
          this.orderCreating = false
          this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка')
          this.dialogRef.close(false)
        }
      }
    );
  }
}