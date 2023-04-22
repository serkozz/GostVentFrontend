import { UserStoreService } from './../../services/userStore.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { ToastrService } from 'ngx-toastr';
import { PasswordManipulationsDialogComponent } from './password-manipulations-dialog/password-manipulations-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public username: string = '';
  public email: string = '';
  public role: 'Admin' | 'User' = 'User';
  public selectedPage: 'Administration' | 'Orders' | 'Products' | 'Statistics' =
    'Statistics';
  moreActions: any;

  constructor(
    private loginService: LoginService,
    private userStore: UserStoreService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userStore.getUsername().subscribe((res) => {
      let username = this.loginService.getUsernameFromToken();
      this.username = res || username;
    });

    this.userStore.getEmail().subscribe((res) => {
      let email = this.loginService.getEmailFromToken();
      this.email = res || email;
      console.log(email);
    });

    this.userStore.getRole().subscribe((res) => {
      let role = this.loginService.getRoleFromToken();
      this.role = res || role;
    });
  }

  logoClick() {
    this.loginService.clearToken();
  }

  onAdministrationClick() {
    this.selectedPage = 'Administration';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onProductsClick() {
    this.selectedPage = 'Products';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onHistoryClick() {
    this.selectedPage = 'Orders';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onStatisticsClick() {
    this.selectedPage = 'Statistics';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  expandUserActionsPanel() {
    this.moreActions = !this.moreActions;
  }

  userActionClick(event: Event) {
    let actionDiv: HTMLDivElement = event.target as HTMLDivElement;
    let action = actionDiv.className.split(' ', 2)[1];
    console.log(action);
    this.moreActions= !this.moreActions

    switch (action) {
        case 'delete':
          this.deleteAccount();
          break;
        default:
          this.passwordManipulations(action as 'change' | 'restore');
          break;
    }
  }

  passwordManipulations(passwordManipulationType: 'change' | 'restore') {
    let dialog = this.dialog.open(PasswordManipulationsDialogComponent, {
      minWidth: '200px',
      maxWidth: '400px',
      data: {
        passwordManipulationType: passwordManipulationType,
        email: this.email
      },
    });

    dialog.afterClosed().subscribe({
      next: async (dialogRes: boolean) => {
        if (dialogRes == true) this.toastr.success('Заказ удален', 'Успех');
      },
      error: (err: ErrorInfo) =>
        this.toastr.error(`Возникла ошибка: ${err.message}`, 'Ошибка'),
    });
  }

  deleteAccount() {
    this.userService.deleteAccount(this.email).subscribe(
      {
        next: (confirmationLink: any) => {
          this.toastr.info("Для удаления аккаунта перейдите по ссылке на почте, после подтверждения любые действия с аккаунтом будут невозможны", "Необходимо подтверждение")
        },
        error: (err: ErrorInfo) => {
          this.toastr.error(err.message, "Ошибка")
        }
      }
    )
  }
}
