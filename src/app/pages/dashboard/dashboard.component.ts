import { UserStoreService } from './../../services/userStore.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any[] = []
  public username: string = ""
  public role: string = ""

  constructor(private loginService: LoginService,
    private userStore: UserStoreService) {}

  ngOnInit() {

    this.userStore.getUsername().subscribe(res => {
      let username = this.loginService.getUsernameFromToken()
      this.username = res || username
    })

    this.userStore.getRole().subscribe(res => {
      let role = this.loginService.getRoleFromToken()
      this.role = res || role
    })
  }
  logoutClick() {
    this.loginService.logoutUser()
  }
}
