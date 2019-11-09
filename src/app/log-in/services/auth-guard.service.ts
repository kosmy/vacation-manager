import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
 

  constructor(private authService: AuthorizationService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['log-in']);
      return false;
    }
    return true;
  }
}
