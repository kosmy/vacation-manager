import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { decode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (
      !this.authService.isAuthenticated() || !this.authService.tokenData ||
      this.authService.tokenData.role !== expectedRole
    ) {
      this.router.navigate(['log-in']);
      return false;
    }
    else if (!this.authService.tokenData.role) {
      this.router.navigate(['log-in']);
    }
    return true;
  }
}
