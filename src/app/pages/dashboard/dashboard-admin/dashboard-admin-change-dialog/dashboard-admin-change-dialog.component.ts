import { FieldData } from './../dashboard-admin.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dashboard-admin-change-dialog',
  templateUrl: './dashboard-admin-change-dialog.component.html',
  styleUrls: ['./dashboard-admin-change-dialog.component.scss'],
})
export class DashboardAdminChangeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardAdminChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fieldNames: string[]; fieldValues: string[]}
  ) {}

  ngOnInit() {
    // User shouldn't be able to manipulate ids!!!!!
    console.log('Data');
    console.log(this.data);
  }

  /**
   * Возвращает измененную в диалоговом окне запись в виде набора значений (без ключей)
   * @returns Возвращает массив, содержащий значения измененных полей
   */
  getUpdatedData(): string[] {
    let formGroups = document.getElementsByClassName(
      'form-group'
    ) as HTMLCollectionOf<HTMLDivElement>;
    let updatedData: string[] = [];

    for (let i = 0; i < formGroups.length; i++) {
      if (formGroups[i].children.length == 0) continue;

      let input = formGroups[i].children[1] as HTMLInputElement;
      updatedData.push(input.value);
    }

    return updatedData;
  }

  /**
   * Создает словарь из значений измененной записи и названий полей (для передачи в бэкенд, для удобства манипулирования)
   * @returns Возвращает словарь ключами которого являются объекты fieldNames[], а значениями измененные в диалоговом окне строки
   */
  createMap() {
    let updatedData = this.getUpdatedData();
    let mappedData: Map<string, string> = new Map();
    updatedData.forEach((val, ind, arr) => {
      mappedData.set(this.data.fieldNames[ind], val);
    });
    return mappedData
  }

  cancelBtnClick() {
    console.log('Cancel button clicked');
    this.dialogRef.close();
  }

  saveBtnClick() {
    console.log('Save button clicked');
    let mappedResult = this.createMap()
    this.dialogRef.close(mappedResult);
  }
}
