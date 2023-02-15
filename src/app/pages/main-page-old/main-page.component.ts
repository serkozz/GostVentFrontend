import { Component } from '@angular/core';

@Component({
  selector: 'main-page-old',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageOldComponent {

  contentBlockClick()
  {
    console.log('ContentBlockClicked')
  }
}
