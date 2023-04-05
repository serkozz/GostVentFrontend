import { DatabaseAction } from 'src/app/types/databaseAction';
import {
  DashboardAdminChangeDialogComponent,
  DatabaseActionWithData,
} from './dashboard-admin-change-dialog/dashboard-admin-change-dialog.component';
import { DatabaseService } from './../../../services/database.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Enumerable from 'linq'
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { OrderService } from 'src/app/services/order.service';
import { type } from 'jquery';

@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  /// All tables from backend database
  public tables: string[] = [];

  public selectedTable: string = '';

  /// All items from selected table
  public items: any[] = [];

  /// All table headers for selected table
  public tableHeaders: any[] = [];

  /// Changing row data
  public changingRowData: Map<string, string> | undefined = undefined;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private databaseService: DatabaseService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  async ngOnInit() {
    this.tables = await this.loadTables();
    this.selectedTable = this.tables[0];
    if (this.tables.length != 0) this.loadItems();
  }

  async reloadComponent() {
    this.tables = await this.loadTables();
      if (this.tables.length != 0) await this.loadItems();
  }

  /// Loads items from selected table into items array
  public async loadItems() {
    switch (this.selectedTable) {
      case 'User':
        this.items = await lastValueFrom(this.userService.getUsers());
        console.log(this.items)
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      case 'Order':
        this.items = await lastValueFrom(this.orderService.getOrders());
        console.log(this.items)
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      case 'Test':
        this.items = await lastValueFrom(this.databaseService.getTests());
        console.log(this.items)
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      default:
        break;
    }
  }

  /// Loads tables to selector
  async loadTables() {
    return await lastValueFrom(this.databaseService.getTables());
  }

  /// Get all values from item fields
  itemGetValues(item: any) {
    // let values: unknown[] = []

    // Object.values(item).forEach(value => {
    //   if (typeof value == 'object')
    //     values.push((value as ObjectWithId).id)
    //   else
    //     values.push(value)
    // });
    // console.log(values)
    // return values;
    let values: unknown[] = Object.values(item)
    // console.log(this.items)
    return values
  }

  private fillChangingRowData(headers: any[], data: any[]) {
    if (headers.length != data.length) {
      this.toastr.error(
        'Заголовки таблицы не соответствуют данным в ней (разный размер)',
        'Ошибка'
      );
      return;
    }

    this.changingRowData = new Map();

    for (let index = 0; index < headers.length; index++) {
      this.changingRowData.set(headers[index], data[index]);
    }
  }

  /// Events

  tableSelectorChanged(event: any) {
    let selector = event.target as HTMLSelectElement;
    let tableIndex = selector.selectedIndex;
    this.selectedTable = this.tables[tableIndex];
    this.toastr.info(`Выбрана таблица: ${this.selectedTable}`, "Таблица", {
      timeOut: 500
    });
    this.loadItems();
  }

  onFilterChange(event: Event) {
    let input: HTMLInputElement = event.target as HTMLInputElement;
    let table: HTMLTableElement = document.getElementsByClassName(
      'fl-table'
    )[0] as HTMLTableElement;
    let rows = Array.from(table.getElementsByTagName('tr'));
    rows.splice(0, 1);
    let rowCells: HTMLTableCellElement[];

    for (let i = 0; i < rows.length; i++) {
      rowCells = Array.from(rows[i].getElementsByTagName('td'));

      let match: boolean = Enumerable.from(rowCells).any((el) =>
        (el.innerText || el.innerHTML)
          .toLowerCase()
          .includes(input.value.toLowerCase())
      );

      if (match) rows[i].style.display = '';
      else rows[i].style.display = 'none';
    }
  }

  btnChangeClick(event: Event) {
    let btn = event.target as HTMLButtonElement;
    /// row including change column
    let rowFull: HTMLTableRowElement = btn.parentElement
      ?.parentElement as HTMLTableRowElement;
    /// transform it to array and remove last change column
    let dataCellArray = Array.from(rowFull.getElementsByTagName('td')).splice(
      0,
      rowFull.childElementCount - 1
      );

      let data: any[] = [];
      dataCellArray.forEach((element) => {
      data.push(element.innerText);
    });
    this.fillChangingRowData(this.tableHeaders, data);
    this.openChangeDialog(this.tableHeaders, data, 'Update', '500', '500');
  }

  btnAddClick(event: Event) {
    this.openChangeDialog(this.tableHeaders, [], 'Add', '500', '500')
    this.toastr.info('BtnAddCLick', 'Click');
  }

  openChangeDialog(
    fieldNames: string[],
    fieldValues: string[],
    dialogType: 'Add' | 'Update',
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let dialog = this.dialog.open(DashboardAdminChangeDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        fieldNames,
        fieldValues,
        dialogType
      },
    });

    dialog.afterClosed().subscribe({
      next: (dialogRes: DatabaseActionWithData) => {
        if (dialogRes == null) {
          this.toastr.info('Изменения не обнаружены', 'Информация');
          return;
        }
        this.processChangeDialogResult(dialogRes)
      },
      error: (err: ErrorInfo) => this.toastr.info(`${err.message}`, `Ошибка`),
    })
  }

  async processChangeDialogResult(dialogRes: DatabaseActionWithData) {
    let actionString!: string
    switch (dialogRes.action) {
      case DatabaseAction.Post:
        actionString = "добавлены"
        break;
      case DatabaseAction.Delete:
        actionString = "удалены"
        break;
      case DatabaseAction.Update:
        actionString = "изменены"
        break;
      default:
        break;
    }

    this.databaseService.performAction(
      dialogRes.action,
      dialogRes.data,
      this.selectedTable
    ).subscribe(
      {
        next: (res) => {
          this.toastr.success(`Данные успешно ${actionString}!`, 'Успех');
          console.log(res);
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(`Данные не были ${actionString}! ${err.message}`, 'Ошибка');
          console.log(err.message)
        }
      }
    )
    /// FIXME: Обновление происходит не всегда (иногда приходится вручную менять вьюшку чтобы она обновилась)
    setTimeout(async () => {
      await this.reloadComponent();
    }, 500);
  }
}