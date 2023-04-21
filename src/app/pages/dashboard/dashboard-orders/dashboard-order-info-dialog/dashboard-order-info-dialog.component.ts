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
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentResponse } from 'src/app/types/paymentResponse';
import { YooKassaPaymentInfo, translateStatus } from 'src/app/types/paymentInfo';
import { OrderRating } from 'src/app/types/orderRating';

@Component({
  selector: 'dashboard-order-info-dialog',
  templateUrl: './dashboard-order-info-dialog.component.html',
  styleUrls: ['./dashboard-order-info-dialog.component.scss'],
})
export class DashboardOrderInfoDialogComponent implements OnInit {
  selectedOrder!: Order;
  paymentInfo!: YooKassaPaymentInfo
  orderPriced: boolean = false
  orderPaid: boolean = false
  ratingChosen: boolean = false
  rating: OrderRating = { rating: 0, review: ''}
  email!: string;
  orderFiles: OrderFileInfo[] = [];
  filesToAddList: File[] = [];
  orderFilesFetched: boolean = false;
  productType = ProductType;
  orderStatus = OrderStatus;
  dayTextForms = dayTextForms;
  declNum = declNum;
  declDate = declDate;
  translateStatus = translateStatus

  constructor(
    public dialogRef: MatDialogRef<DashboardOrderInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      order: Order;
      email: string;
    },
    public orderService: OrderService,
    public paymentService: PaymentService,
    public toastr: ToastrService
  ) {
    this.selectedOrder = data.order;
    this.email = data.email;
  }

  async ngOnInit() {
    await this.loadFiles();
    await this.getOrderStatus();
    await this.getOrderRating();

    if (this.selectedOrder.price > 0) this.orderPriced = true;
  }

  async getOrderRating() {
    this.orderService.getOrderRating(this.selectedOrder, this.email).subscribe(
      {
        next: (orderRating: OrderRating) => {
          this.rating = orderRating
          console.log(this.rating)
          this.setRatingSection()
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(err.message, 'Ошибка')
        }
      }
    )
  }

  setRatingSection() {
    let star: HTMLInputElement = document.getElementById(`star${this.rating.rating}`) as HTMLInputElement
    star.checked = true
    let textArea: HTMLTextAreaElement = document.getElementById('input-review') as HTMLTextAreaElement
    textArea.value = this.rating.review
  }

  async loadFiles() {
    this.orderService.getOrderFiles(this.selectedOrder, this.email).subscribe({
      next: (files: OrderFileInfo[]) => {
        this.orderFiles = files;
        this.orderFilesFetched = true;
      },
      error: (err: ErrorInfo) => {
        this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка');
        this.orderFilesFetched = true;
      },
    });
  }

  async getOrderStatus() {
    this.paymentService.orderStatus(this.selectedOrder, this.email).subscribe({
      next: (payment: YooKassaPaymentInfo) => {
        this.paymentInfo = payment
        if (this.paymentInfo.paid && this.paymentInfo != null)
          this.orderPaid = true
        console.log(this.paymentInfo)
      },
      error: (err: ErrorInfo) => {
        console.log(err)
      },
    });
  }

  orderDeleteBtnClick() {
    this.orderService.deleteOrder(this.selectedOrder, this.email).subscribe({
      next: (val) => {
        console.log(val);
        this.dialogRef.close(true);
      },
      error: (err: ErrorInfo) => {
        this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка');
        this.dialogRef.close(false);
      },
    });
  }

  async deleteOrderFile(event: Event) {
    let deleteIcon = event.target as HTMLElement;
    let orderFileDiv = deleteIcon.parentElement;
    let orderLinkElement: HTMLElement =
      deleteIcon.parentElement?.getElementsByClassName(
        'order-file-link'
      )[0] as HTMLElement;
    let orderName = orderLinkElement.innerText;

    let selectedOrderFileInfo: OrderFileInfo | undefined = this.orderFiles.find(
      (order) => order.name == orderName
    );

    if (typeof selectedOrderFileInfo == 'undefined') {
      console.error('Не получилось выбрать файл заказа для удаления');
      return;
    }

    this.orderService.deleteOrderFile(selectedOrderFileInfo).subscribe({
      next: (orderFileInfo: OrderFileInfo) => {
        this.toastr.success(
          `Файл ${orderFileInfo.name} был успешно удален`,
          'Успех'
        );
        orderFileDiv?.remove();
      },
      error: (error: ErrorInfo) => {
        this.toastr.success(error.message, 'Ошибка');
      },
    });
    console.log(selectedOrderFileInfo);
  }

  async onInputChange(event: Event) {
    this.filesToAddList = [];
    let files = (event.target as HTMLInputElement).files!;
    for (let i = 0; i < files.length; i++) {
      this.filesToAddList.push(files[i]);
    }
    console.log(this.filesToAddList);

    let filesToAddForm: FormData = new FormData();
    this.filesToAddList.forEach((file) => {
      filesToAddForm.append('test', file, file.name);
    });

    this.orderService
      .addOrderFiles(filesToAddForm, this.selectedOrder, this.email)
      .subscribe({
        next: (addInfo) => {
          this.toastr.success(
            `Файлы успешно добавлены, обновите страницу`,
            'Успех'
          );
        },
        error: (error: ErrorInfo) => {
          this.toastr.success(
            `Файлы успешно добавлены, обновите страницу`,
            'Успех'
          );
        },
      });
  }

  checkout() {
    this.paymentService
      .orderCheckout(this.selectedOrder, this.email)
      .subscribe({
        next: (paymentResponse: PaymentResponse) => {
          window.open(paymentResponse.confirmation.confirmationUrl, '_self');
        },
        error: (err: ErrorInfo) => {
          console.log(err);
        },
      });
  }

  starBtnClick(event: Event) {
    let starRadio: HTMLInputElement = event.target as HTMLInputElement
    this.rating.rating = Number(starRadio.value)
    this.ratingChosen = true
  }

  onReviewChanged() {
    let reviewTextArea: HTMLTextAreaElement = document.getElementById('input-review') as HTMLTextAreaElement
    this.rating.review = reviewTextArea.value
    this.ratingChosen = true
  }

  rateOrder() {
    if (this.rating.rating == 0)
    {
      this.toastr.error("Нулевой рейтинг поставить нельзя", "Ошибка")
      return
    }

    if (this.rating.review.length == 0)
    {
      this.toastr.error("Оставьте отзыв", "Ошибка")
      return
    }
    console.log(this.rating);

    this.orderService.rateOrder(this.selectedOrder, this.email, this.rating).subscribe(
      {
        next: (orderRating: OrderRating) => {
          this.rating = orderRating
          console.log(this.rating)
          this.toastr.success("Спасибо за оценку", "Успех")
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(err.message, 'Ошибка')
        }
      }
    )
  }
}
