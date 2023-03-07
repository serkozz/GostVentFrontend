import { LoginInterceptor } from './interceptors/login.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageAdaptiveComponent } from './pages/main-page-adaptive/main-page-adaptive.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainPageAdaptiveComponent,
    LoginPageComponent,
    DashboardComponent,
    DashboardAdminComponent
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
    ReactiveFormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
