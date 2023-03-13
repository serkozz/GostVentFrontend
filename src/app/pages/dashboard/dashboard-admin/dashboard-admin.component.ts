import { DatabaseAction } from 'src/app/types/databaseAction';
import {
  DashboardAdminChangeDialogComponent,
  DatabaseActionWithData,
} from './dashboard-admin-change-dialog/dashboard-admin-change-dialog.component';
import { DatabaseService } from './../../../services/database.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Enumerable from 'linq';
import { ToastrService } from 'ngx-toastr';

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

  /// Only items that match filter
  public filteredItems!: Enumerable.IEnumerable<any>;

  /// All table headers for selected table
  public tableHeaders: any[] = [];

  /// Changing row data
  public changingRowData: Map<string, string> | undefined = undefined;

  constructor(
    private userService: UserService,
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
      if (this.tables.length != 0) this.loadItems();
  }

  /// Loads items from selected table into items array
  public async loadItems() {
    switch (this.selectedTable) {
      case 'User':
        this.items = await lastValueFrom(this.userService.getUsers());
        console.log(this.items)
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      case 'Test':
        this.items = await lastValueFrom(this.databaseService.getTests());
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      default:
        break;
    }
    this.filteredItems = Enumerable.from(this.items);
  }

  /// Loads tables to selector
  async loadTables() {
    return await lastValueFrom(this.databaseService.getTables());
  }

  /// Get all values from item fields
  itemGetValues(item: any) {
    return Object.values(item);
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
    this.toastr.info(`Выбрана таблица: ${this.selectedTable}`);
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

  btnChangeClick(event: any) {
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
    this.openChangeDialog(this.tableHeaders, data, '500', '500');
  }

  openChangeDialog(
    fieldNames: string[],
    fieldValues: string[],
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
      },
    });
    dialog.afterClosed().subscribe({
      next: (dialogRes: DatabaseActionWithData) => {
        if (dialogRes == null) {
          this.toastr.info('Изменения не обнаружены', 'Информация');
          return;
        }
        this.databaseService.performAction(
          dialogRes.action,
          dialogRes.data,
          this.selectedTable
        );
        this.toastr.success('Данные успешно модифицированы!', 'Успех');
        /// TODO: Сюда пропихнуть обновление таблицы
        this.reloadComponent();
      },
      error: (err) => this.toastr.info(`Возникла ошибка: ${err}`, 'Ошибка'),
    });
  }
}

export interface FieldData {
  fieldName: string;
  fieldContent: string;
}
