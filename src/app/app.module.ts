import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageAdaptiveComponent } from './pages/main-page-adaptive/main-page-adaptive.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainPageAdaptiveComponent,
    LoginPageComponent,
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
