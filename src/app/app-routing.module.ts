import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageAdaptiveComponent } from './pages/main-page-adaptive/main-page-adaptive.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageAdaptiveComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
