import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    @Input() isSuperuser: boolean = false;

  ngOnInit(): void {
    if (this.isSuperuser)
      document.querySelector('#admin-panel')?.classList.toggle('hidden')
  }

  openMenu()
  {
    let menu = document.querySelector('#menu')
    let navbar = document.querySelector('.navbar');

    // Смена иконки в зависимости от текущего состояния меню
    // Open

    if (menu?.classList.contains('ri-menu-line'))
      menu.classList.replace('ri-menu-line','ri-close-line')
    // Close
    else if (menu?.classList.contains('ri-close-line'))
      menu.classList.replace('ri-close-line', 'ri-menu-line')

    navbar?.classList.toggle('open')
  }
}
