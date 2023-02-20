import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageAdaptiveComponent } from './pages/main-page-adaptive/main-page-adaptive.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageAdaptiveComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
