import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.loginService.getToken()

    if (authToken)
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${authToken}`}
      })

    return next.handle(request);
  }
}
