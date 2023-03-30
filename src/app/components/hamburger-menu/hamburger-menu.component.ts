import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() role: string = 'User'
  @Input() selectedPage!: 'Administration' | 'Orders' | 'Products'
  @Output() selectedPageChange = new EventEmitter<'Administration' | 'Orders' | 'Products'>();

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
      case 'Управление':
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
