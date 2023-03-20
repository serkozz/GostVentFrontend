import { OrderService } from './../../../../services/order.service';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-products-order-dialog',
  templateUrl: './dashboard-products-order-dialog.component.html',
  styleUrls: ['./dashboard-products-order-dialog.component.scss']
})
export class DashboardProductsOrderDialogComponent {

  fileList: File[] = []

  constructor(
    public dialogRef: MatDialogRef<DashboardProductsOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productName: string;
    },
    public orderService: OrderService
  ) {}


  onInputChange(event: Event) {
    this.fileList = []
    let files = (event.target as HTMLInputElement).files!
    for (let i = 0; i < files.length; i++) {
      this.fileList.push(files[i])
    }
    console.log(this.fileList)
  }

  orderBtnClick(event: Event) {
    console.log("Clicked")
    let orderData: FormData = new FormData()
    this.fileList.forEach(file => {
      orderData.append('test', file, file.name)
    });
    this.orderService.createOrder(orderData).subscribe(
      {
        next: (val) => {
          console.log(val);
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }
}