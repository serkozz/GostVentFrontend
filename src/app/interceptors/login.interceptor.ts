import { ErrorInfo } from 'src/app/types/errorInfo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';



/// Все что делает данный перехватчик, это ловит исходящий запрос и подставляет заголовок Authorization
/// Полученный ответ от сервера отлавливается, и проверяется на наличие ошибок, если ошибка 401 (не авторизован)
/// то возвращаем пользователя на страницу авторизации, если ошибка другого типа, то оставляем ошибку необработанной
/// Обработкой остальных типов ошибок занимаются подписчики в сервисах
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.loginService.getToken()

    if (authToken)
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${authToken}`}
      })

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse)
        {
          if (err.status == 401)
          {
            this.toastr.warning("Токен истек, необходима повторная авторизация", "Внимание")
            this.router.navigate(['/login'])
          }

        }
        return throwError(() => err.error)
      })
    );
  }
}
