import { OrderStatus } from './../../../../types/orderStatus';
import { ProductType } from './../../../../types/productType';
import { OrderService } from './../../../../services/order.service';
import { Order } from './../../../../types/order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { dayTextForms, declDate, declNum } from 'src/app/types/utilityFuncs';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { ToastrService } from 'ngx-toastr';
import { OrderFileInfo } from 'src/app/types/fileInfo';

@Component({
  selector: 'dashboard-order-info-dialog',
  templateUrl: './dashboard-order-info-dialog.component.html',
  styleUrls: ['./dashboard-order-info-dialog.component.scss'],
})
export class DashboardOrderInfoDialogComponent implements OnInit {
  selectedOrder!: Order
  orderPriced: boolean = false
  email!: string
  orderFiles: OrderFileInfo[] = []
  filesToAddList: File[] = []
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
    public toastr: ToastrService,
  ) {
    this.selectedOrder = data.order
    this.email = data.email
  }

  async ngOnInit() {
    await this.loadFiles();

    if (this.selectedOrder.price > 0)
      this.orderPriced = true
  }

  async loadFiles() {
    this.orderService.getOrderFiles(this.selectedOrder, this.email).subscribe(
      {
        next: (files: OrderFileInfo[]) => {
          this.orderFiles = files
          this.orderFilesFetched = true
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка')
          this.orderFilesFetched = true
        }
      }
    )
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

  async deleteOrderFile(event: Event) {
    let deleteIcon = event.target as HTMLElement
    let orderFileDiv = deleteIcon.parentElement
    let orderLinkElement: HTMLElement = deleteIcon.parentElement?.getElementsByClassName("order-file-link")[0] as HTMLElement
    let orderName = orderLinkElement.innerText

    let selectedOrderFileInfo: OrderFileInfo | undefined = this.orderFiles.find(
      order => order.name == orderName
    )

    if (typeof selectedOrderFileInfo == 'undefined')
    {
      console.error("Не получилось выбрать файл заказа для удаления")
      return
    }

    this.orderService.deleteOrderFile(selectedOrderFileInfo).subscribe(
      {
        next: (orderFileInfo:OrderFileInfo) => {
          this.toastr.success(`Файл ${orderFileInfo.name} был успешно удален`, "Успех")
          orderFileDiv?.remove()
        },
        error: (error: ErrorInfo) => {
          this.toastr.success(error.message, "Ошибка")
        }
      }
    )
    console.log(selectedOrderFileInfo)
  }

  async onInputChange(event: Event) {
    this.filesToAddList = []
    let files = (event.target as HTMLInputElement).files!
    for (let i = 0; i < files.length; i++) {
      this.filesToAddList.push(files[i])
    }
    console.log(this.filesToAddList)


    let filesToAddForm: FormData = new FormData()
    this.filesToAddList.forEach(file => {
      filesToAddForm.append('test', file, file.name)
    });

    this.orderService.addOrderFiles(filesToAddForm, this.selectedOrder, this.email).subscribe(
      {
        next: (addInfo) => {
          this.toastr.success(`Файлы успешно добавлены, обновите страницу`, "Успех")
        },
        error: (error: ErrorInfo) => {
          this.toastr.success(`Файлы успешно добавлены, обновите страницу`, "Успех")
        }
      }
    )
  }
}
