import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-password-manipulations-dialog',
  templateUrl: './password-manipulations-dialog.component.html',
  styleUrls: ['./password-manipulations-dialog.component.scss'],
})
export class PasswordManipulationsDialogComponent implements OnInit {
  passwordManipulationType!: 'change' | 'restore';
  email!: string;
  user: User | undefined;

  constructor(
    public dialogRef: MatDialogRef<PasswordManipulationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      passwordManipulationType: 'change' | 'restore';
      email: string;
    },
    public toastr: ToastrService,
    public userService: UserService
  ) {
    this.passwordManipulationType = data.passwordManipulationType;
    this.email = data.email;
  }

  ngOnInit() {
    this.getUserData();
  }

  async getUserData() {
    let users = (await lastValueFrom(this.userService.getUsers())) as User[];
    this.user = users.find((val) => {
      let user = null;
      if (val.email == this.email) user = val;
      return user;
    });

    if (typeof this.user == 'undefined') {
      this.toastr.error('Невозможно получить данные пользователя', 'Ошибка');
      this.dialogRef.close();
    }
  }

  changePassword() {
    console.log('changed');
    let oldPassword = (document.getElementById('old-input') as HTMLInputElement).value
    let newPassword = (document.getElementById('new-input') as HTMLInputElement).value
    let repeatPassword = (document.getElementById('repeat-input') as HTMLInputElement).value

    if (newPassword != repeatPassword)
    {
      this.toastr.error("Новый пароль не совпадает с повторенным", "Ошибка")
      return
    }
    this.userService.changePassword(this.email, oldPassword, newPassword, repeatPassword).subscribe(
      {
        next: (result: any) => {
          this.toastr.success("Пароль успешно изменен", "Успех")
          this.dialogRef.close()
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(err.message, "Ошибка")
        }
      }
    )
  }
}
