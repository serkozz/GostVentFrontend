import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  public tables: string[] = ["Users", "Another"]
  public tableHeaders: string[] = ["Id", "Username", "Email"]
  public tableCells: string[] = ["1", "serkozz", "serkozz@mail.ru"]

  constructor() { }

  ngOnInit() {
  }

  tableSelectorClick(event: any) {
    console.log(event.target.value)
  }

}
