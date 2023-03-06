import { UserStoreService } from './../../services/userStore.service';
import { ApiService } from './../../services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any[] = []
  public username: string = ""
  public role: string = ""

  constructor(private loginService: LoginService,
    private apiService: ApiService,
    private userStore: UserStoreService) {}

  ngOnInit() {
    this.apiService.get("http://localhost:5072/users/all").subscribe(res => this.users = res)
    console.log(this.users)

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
