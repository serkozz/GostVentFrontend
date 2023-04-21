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
    if (this.passwordManipulationType == 'restore')
      this.sendRestoreConfirmationCode()
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

  sendRestoreConfirmationCode() {
    this.userService.sendRestoreConfirmationCode(this.email).subscribe(
      {
        next: (result: any) => {
          this.toastr.info("Для восстановления пароля введите код, пришедший на почту в специальное поле, а также введите новый пароль", "Информация")
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(err.message, "Ошибка")
        }
      }
    )
  }

  restorePassword() {
    console.log('restored');
    let confirmationKey = (document.getElementById('confirmation-key') as HTMLInputElement).value
    let newPassword = (document.getElementById('new-input') as HTMLInputElement).value
    let repeatPassword = (document.getElementById('repeat-input') as HTMLInputElement).value

    if (newPassword != repeatPassword)
    {
      this.toastr.error("Новый пароль не совпадает с повторенным", "Ошибка")
      return
    }

    this.userService.restorePassword(this.email, confirmationKey, newPassword, repeatPassword).subscribe(
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

