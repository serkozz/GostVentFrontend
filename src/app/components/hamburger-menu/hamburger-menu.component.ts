import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() role: 'Admin' | 'User' = 'User'
  @Input() selectedPage!: 'Administration' | 'Orders' | 'Products' | 'Statistics'
  @Output() selectedPageChange = new EventEmitter<'Administration' | 'Orders' | 'Products' | 'Statistics'>();

  constructor(private loginService: LoginService) {
  }

  logoClick() {
    this.loginService.clearToken();
  }

  menuItemClick(event: Event) {
    let anchor = event.target as HTMLAnchorElement
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
}
