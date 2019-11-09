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
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.authService.isAuthenticated() ||
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['log-in']);
      return false;
    }
    return true;
  }
}
