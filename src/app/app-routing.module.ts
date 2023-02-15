import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageOldComponent } from './pages/main-page-old/main-page.component';
import { MainPageSecondComponent } from './pages/main-page-second/main-page-second.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageSecondComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
