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
  public role: string = '';
  public selectedPage: 'Administration' | 'History' | 'Products' = 'Products';

  constructor(
    private loginService: LoginService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userStore.getUsername().subscribe((res) => {
      let username = this.loginService.getUsernameFromToken();
      this.username = res || username;
    });

    this.userStore.getRole().subscribe((res) => {
      let role = this.loginService.getRoleFromToken();
      this.role = res || role;
    });
  }

  logoutClick() {
    this.loginService.logoutUser();
  }

  onAdministrationClick() {
    this.selectedPage = 'Administration';
    console.log(`SelectedPage: ${this.selectedPage}`)
  }

  onProductsClick() {
    this.selectedPage = "Products"
    console.log(`SelectedPage: ${this.selectedPage}`)
  }

  onHistoryClick() {
    this.selectedPage = "History"
    console.log(`SelectedPage: ${this.selectedPage}`)
  }
}
