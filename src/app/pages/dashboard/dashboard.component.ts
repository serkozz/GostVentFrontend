import { ApiService } from './../../services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any[] = []
  constructor(private loginService: LoginService, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get("http://localhost:5072/users/all").subscribe(res => this.users = res)
    console.log(this.users)
  }
  logoutClick() {
    this.loginService.logoutUser()
  }
}
