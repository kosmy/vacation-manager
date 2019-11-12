import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/main/modules/shared/models/employee';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthorizationService {

  private apiUrl: string = 'https://vacations.polytech.rocks:52540';
  private _currentUserId: Employee['id'];
  jwtHelper = new JwtHelperService();
  public tokenData;

  get currentUserId() {
    return this._currentUserId;
  }

  set currentUserId(id: string) {
    this._currentUserId = id;
  }

  constructor(private http: HttpClient, ) { }

  singIn(userDetails: { email: string, password: string }) {

    const formData = new FormData();
    formData.append('username', userDetails.email);
    formData.append('password', userDetails.password);
    formData.append('client_id', 'api');
    formData.append('client_secret', 'vacationsecrets');
    formData.append('grant_type', 'password');

    return this.http.post(this.apiUrl + '/connect/token', formData)
      .pipe(map((response) => {
        localStorage.setItem('auth_token', response['access_token']);
        this.tokenData = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'));
        console.log("Token Data", this.tokenData)
        this.currentUserId = this.tokenData.sub;
      }));
  }

  forgotPassword(request): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/auth/forgotPassword', request);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
