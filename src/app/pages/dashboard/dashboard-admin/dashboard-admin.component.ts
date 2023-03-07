import { DatabaseService } from './../../../services/database.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';

@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  /// All tables from backend database
  public tables: string[] = []

  /// All items from selected table
  public items: any[] = []

  /// All table headers for selected table
  public tableHeaders: any[] = []

  /// Changing row data
  public changingRowData: Map<string, string> | undefined = undefined


  constructor(private userService: UserService,
    private databaseService: DatabaseService) {}

  async ngOnInit() {
    this.tables = await this.loadTables()
    // console.log(this.tables)
    if (this.tables.length != 0)
      this.loadItems(this.tables[0])
  }


  /// Loads items from selected table into items array
  public async loadItems(tableName: string) {
    switch (tableName) {
      case 'User':
        this.items = await lastValueFrom(this.userService.getUsers())
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      case 'Test':
        this.items = await lastValueFrom(this.databaseService.getTests())
        this.tableHeaders = Object.keys(this.items[0]);
        break;
        default:
          break;
        }
    // console.log(`Item:`)
    // console.log(this.items[0])
  }

  /// Loads tables to selector
  async loadTables() {
    return await lastValueFrom(this.databaseService.getTables())
  }

  /// Get all values from item fields
  itemGetValues(item: any) {
    return Object.values(item)
  }

  private fillChangingRowData(headers: any[], data: any[]) {
    if (headers.length != data.length) {
      console.error("Headers and data have different array size")
      return
    }

    this.changingRowData = new Map()

    for (let index = 0; index < headers.length; index++) {
      this.changingRowData.set(headers[index], data[index])
    }
    console.log(this.changingRowData)
  }



  /// Events



  tableSelectorChanged(event:any) {
    let selector = event.target as HTMLSelectElement
    let tableIndex = selector.selectedIndex
    console.log(`SelectedTableIndex: ${tableIndex}`)
    this.loadItems(this.tables[tableIndex])
  }

  btnChangeClick(event:any) {
    let btn = event.target as HTMLButtonElement
    /// row including change column
    let rowFull: HTMLTableRowElement = btn.parentElement?.parentElement as HTMLTableRowElement
    /// transform it to array and remove last change column
    let dataCellArray = Array.from(rowFull.getElementsByTagName('td'))
    .splice(0, rowFull.childElementCount - 1);

    let data: any[] = []
    dataCellArray.forEach(element => {
      data.push(element.innerText)
    });
    // console.log("Headers")
    // console.log(this.tableHeaders)
    // console.log("Data")
    // console.log(data)
    this.fillChangingRowData(this.tableHeaders, data)
  }
}
