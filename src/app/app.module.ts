import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageOldComponent } from './pages/main-page-old/main-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageSecondComponent } from './pages/main-page-second/main-page-second.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageOldComponent,
    NavBarComponent,
    PageNotFoundComponent,
    MainPageSecondComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
