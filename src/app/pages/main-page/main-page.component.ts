import { Component } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  openMenu()
  {
    let menu = document.querySelector('#menu')
    let navbar = document.querySelector('.navbar')

    if (menu?.classList.contains('ri-menu-line'))
      menu.classList.replace('ri-menu-line','ri-close-line')
    else if (menu?.classList.contains('ri-close-line'))
      menu.classList.replace('ri-close-line', 'ri-menu-line')
    navbar?.classList.toggle('open')
  }
}
