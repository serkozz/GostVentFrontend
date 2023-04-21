import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PasswordManipulationsDialogComponent } from 'src/app/pages/dashboard/password-manipulations-dialog/password-manipulations-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorInfo } from 'src/app/types/errorInfo';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() username: string = ''
  @Input() email!: string
  @Input() role: 'Admin' | 'User' = 'User'
  @Input() selectedPage!: 'Administration' | 'Orders' | 'Products' | 'Statistics'
  @Output() selectedPageChange = new EventEmitter<'Administration' | 'Orders' | 'Products' | 'Statistics'>();

  moreActions: boolean = false

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private userService: UserService) {
  }

  logoClick() {
    this.loginService.clearToken();
  }

  menuItemClick(event: Event) {
    let anchor = event.target as HTMLAnchorElement

    if ((event.target as HTMLLIElement).className.split(' ', 2)[1] == 'expandable')
    {
      this.moreActions = !this.moreActions
      return
    }
    this.toggle()
    switch (anchor.innerText) {
      case 'Товары':
        this.selectedPage = 'Products'
        this.selectedPageChange.emit('Products')
        break;
      case 'Заказы':
        this.selectedPage = 'Orders'
        this.selectedPageChange.emit('Orders')
        break;
      case 'Статистика':
        this.selectedPage = 'Statistics'
        this.selectedPageChange.emit('Statistics')
        break;
      case 'Управление БД':
        this.selectedPage = 'Administration'
        this.selectedPageChange.emit('Administration')
        break;
    }
  }

  toggle() {
    let toggle = document.getElementById('menu__toggle') as HTMLInputElement
    toggle.checked = false
  }

  userActionClick(event: Event) {
    let actionDiv: HTMLDivElement = event.target as HTMLDivElement;
    let action = actionDiv.className.split(' ', 2)[1];
    console.log(action);
    this.moreActions= !this.moreActions
    this.toggle()
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
      minWidth: '80vw',
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

  expandUserActionsPanel() {
    this.moreActions != this.moreActions
  }
}
