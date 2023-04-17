import { UserStoreService } from './../../services/userStore.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public username: string = '';
  public email: string = '';
  public role: 'Admin' | 'User' = 'User';
  public selectedPage: 'Administration' | 'Orders' | 'Products' | 'Statistics' =
    'Orders';

  constructor(
    private loginService: LoginService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userStore.getUsername().subscribe((res) => {
      let username = this.loginService.getUsernameFromToken();
      this.username = res || username;
    });

    this.userStore.getEmail().subscribe((res) => {
      let email = this.loginService.getEmailFromToken();
      this.email = res || email;
      console.log(email);
    });

    this.userStore.getRole().subscribe((res) => {
      let role = this.loginService.getRoleFromToken();
      this.role = res || role;
    });
  }

  logoClick() {
    this.loginService.clearToken();
  }

  onAdministrationClick() {
    this.selectedPage = 'Administration';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onProductsClick() {
    this.selectedPage = 'Products';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onHistoryClick() {
    this.selectedPage = 'Orders';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }

  onStatisticsClick() {
    this.selectedPage = 'Statistics';
    console.log(`SelectedPage: ${this.selectedPage}`);
  }
}
