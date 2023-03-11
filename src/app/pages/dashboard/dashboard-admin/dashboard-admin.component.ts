import { DashboardAdminChangeDialogComponent } from './dashboard-admin-change-dialog/dashboard-admin-change-dialog.component';
import {
  DatabaseAction,
  DatabaseService,
} from './../../../services/database.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    private databaseService: DatabaseService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.tables = await this.loadTables();
    this.selectedTable = this.tables[0];
    // console.log(this.tables)
    if (this.tables.length != 0) this.loadItems();
  }

  /// Loads items from selected table into items array
  public async loadItems() {
    switch (this.selectedTable) {
      case 'User':
        this.items = await lastValueFrom(this.userService.getUsers());
        this.tableHeaders = Object.keys(this.items[0]);
        break;
      case 'Test':
        this.items = await lastValueFrom(this.databaseService.getTests());
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
    return Object.values(item);
  }

  private fillChangingRowData(headers: any[], data: any[]) {
    if (headers.length != data.length) {
      console.error('Headers and data have different array size');
      return;
    }

    this.changingRowData = new Map();

    for (let index = 0; index < headers.length; index++) {
      this.changingRowData.set(headers[index], data[index]);
    }
    console.log(this.changingRowData);
  }

  /// Events

  tableSelectorChanged(event: any) {
    let selector = event.target as HTMLSelectElement;
    let tableIndex = selector.selectedIndex;
    this.selectedTable = this.tables[tableIndex];
    console.log(`SelectedTable: ${this.selectedTable}`);
    this.loadItems();
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
      next: (dialogRes) => {
        if (dialogRes == null) {
          console.warn('No changes made to database!');
          return;
        }
        this.databaseService.updateDatabase(
          DatabaseAction.Update,
          dialogRes,
          this.selectedTable
        );
      },
      error: (err) => console.log('Some error?!'),
    });
  }
}

export interface FieldData {
  fieldName: string;
  fieldContent: string;
}
