import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('auth_token')) {
      const modifiedReq = request.clone({
        headers: request.headers.append(
          'Authorization',
          `Bearer ${localStorage.getItem('auth_token')}`)
      });
      return next.handle(modifiedReq);
    }
    // return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
    //   if (error && error.status === 401) {
    //     this.router.navigate(['log-in']);
    //   }
    //   return throwError(error);
    // }));
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("NAVIGAAATE")
            this.router.navigate(['main']);
            this.router.navigate(['log-in']);
          }
        }
      }));
  }
}
