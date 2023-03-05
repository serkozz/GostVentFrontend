import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
    private router : Router,
    private toastr: ToastrService) { }

  canActivate(): boolean{
    if (this.loginService.isLogedIn())
      return true
    else {
      this.toastr.error("Отказано в доступе", "Необходима авторизация")
      this.router.navigate(['/login'])
      return false
    }
  }

}
