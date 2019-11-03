import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService  implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('auth_token')) {
      const modifiedReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          `Bearer ${localStorage.getItem('auth_token')}`)
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error && error.status === 401) {
        this.router.navigate(['log-in']);
      }
      return throwError(error);
    }));
  }
}
