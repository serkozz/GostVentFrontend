import { ProductType } from '../../../types/productType';
import { DashboardProductsOrderDialogComponent } from './dashboard-products-order-dialog/dashboard-products-order-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss'],
})
export class DashboardProductsComponent {
  @Input() email: string = ''
  constructor(private toastr: ToastrService, private dialog: MatDialog) { }

  openOrderDialog(event: Event) {
    let productCard: HTMLDivElement = event.target as HTMLDivElement;
    let productName = productCard.children
      .item(0)
      ?.getElementsByTagName('p')[0].innerText;
    let productType: ProductType | undefined = this.determineProductType(productCard.children.item(0))
    console.log(`ProductName: ${productName}`);
    console.log(`BuyerEmail: ${this.email}`)

    if (productType == undefined)
    {
      this.toastr.error('Заказ не был создан. Не удалось определить тип заказа. CODE_ERROR!!!', 'Неудача');
      return
    }

    let dialog = this.dialog.open(DashboardProductsOrderDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: {
        productName: productName,
        productType: productType,
        email: this.email
      },
    });

    dialog.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes == true)
          this.toastr.success('Заказ создан, отследить его статус можно на вкладке заказов', 'Успех');
          if (dialogRes == false)
          this.toastr.error('Заказ не был создан', 'Неудача');
      },
      error: (err) => this.toastr.error(`Возникла ошибка: ${err}`, 'Ошибка'),
    });
  }

  determineProductType(productCard: Element | null): ProductType | undefined {
    let productTypeStr: string | undefined = productCard?.getElementsByTagName('p').item(0)?.id
    let resultProductType: ProductType | undefined = undefined
    switch (productTypeStr) {
      case 'spiro':
        resultProductType = ProductType.Spiro
        break
      case 'rectangularDuct':
        resultProductType = ProductType.Воздуховод
        break
      case 'silencer':
        resultProductType = ProductType.Глушитель
        break
      case 'deflector':
        resultProductType = ProductType.Дефлектор
        break
      }
      return resultProductType
  }
}
