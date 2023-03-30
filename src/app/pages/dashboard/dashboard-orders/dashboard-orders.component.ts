import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss'],
})
export class DashboardOrdersComponent {
  @Input() email: string = '';
  orderName: string = 'TestOrder'
  orderDate: string = '27.1.2002'
  orderStatus: string = 'Обсуждение'
  productionTime: string = '3 дня'

  constructor(private toastr: ToastrService, private dialog: MatDialog) {}
}
