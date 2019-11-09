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
        const tokenData = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'));
        console.log("Token Data", tokenData)
        this.currentUserId = tokenData.sub;
      }));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // getUserByEmail(email: string): Observable<Employee> {
  //   console.log(email)
  //   return this.http.get<Employee[]>(this.apiUrl + '/api/Employee').pipe(
  //     map((employees) => {
  //       console.log(employees);
  //       return employees
  //         .find(employee =>
  //           employee.email === email
  //         )
  //     }))
  // }
}
