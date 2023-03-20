import { DashboardProductsOrderDialogComponent } from './dashboard-products-order-dialog/dashboard-products-order-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent {

  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog
    ) { }

    openOrderDialog(event: Event) {
      let productCard: HTMLDivElement = event.target as HTMLDivElement
      let productName = productCard.children.item(0)?.getElementsByTagName('p')[0].innerText
      console.log(productName)

      let dialog = this.dialog.open(DashboardProductsOrderDialogComponent,
        {
          data: {
            productName
          }
        })
    }
}
