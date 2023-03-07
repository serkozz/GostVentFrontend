import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { LoginGuard } from './guards/login.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
  {
    path: 'register',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
