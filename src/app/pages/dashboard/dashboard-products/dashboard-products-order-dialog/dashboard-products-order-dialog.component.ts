import { ProductType } from '../../../../types/productType';
import { OrderService } from './../../../../services/order.service';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    public orderService: OrderService
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
    this.orderCreating = true
    this.orderService.createOrder(orderData, this.orderName, this.productType, this.data.email).subscribe(
      {
        next: (val) => {
          console.log(val);
          this.orderCreating = false
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error(err);
          this.orderCreating = false
          this.dialogRef.close(false)
        }
      }
    );
  }
}