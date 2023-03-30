import { LoginInterceptor } from './interceptors/login.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageAdaptiveComponent } from './pages/main-page-adaptive/main-page-adaptive.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardAdminChangeDialogComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-change-dialog/dashboard-admin-change-dialog.component';
import { DashboardProductsComponent } from './pages/dashboard/dashboard-products/dashboard-products.component';
import { DashboardProductsOrderDialogComponent } from './pages/dashboard/dashboard-products/dashboard-products-order-dialog/dashboard-products-order-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DashboardOrdersComponent } from './pages/dashboard/dashboard-orders/dashboard-orders.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainPageAdaptiveComponent,
    LoginPageComponent,
    DashboardComponent,
    DashboardAdminComponent,
    DashboardAdminChangeDialogComponent,
    DashboardProductsComponent,
    DashboardProductsOrderDialogComponent,
    LoadingSpinnerComponent,
    DashboardOrdersComponent,
    HamburgerMenuComponent,
  ],
  imports: [BrowserModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module (for toastr)
    ToastrModule.forRoot({ // ToastrModule added
      preventDuplicates: true,
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
