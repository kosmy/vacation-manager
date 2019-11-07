import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/main/modules/shared/models/employee';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthorizationService {

  private apiUrl: string = 'https://vacations.polytech.rocks:52540';

  private _certainUserId: string;

  tokenData
  
  get certainUserId() {
    return this._certainUserId;
  }

  set certainUserId(id: string) {
    this._certainUserId = id;
  }

  constructor(private http: HttpClient) { }

  singIn(userDetails: { email: string, password: string }) {
    const helper = new JwtHelperService();
    
    const formData = new FormData();
    formData.append('username', userDetails.email);
    formData.append('password', userDetails.password);
    formData.append('client_id', 'api');
    formData.append('client_secret', 'vacationsecrets');
    formData.append('grant_type', 'password');

    return this.http.post(this.apiUrl + '/connect/token', formData)
      .pipe(map((response) => {
        localStorage.setItem('auth_token', response['access_token']);
        this.tokenData = helper.decodeToken(localStorage.getItem('auth_token'));
        console.log(this.tokenData)
      }));
  }

  getUserByEmail(email: string): Observable<Employee> {
    console.log(email)
    return this.http.get<Employee[]>(this.apiUrl + '/api/Employee').pipe(
      map((employees) => {
        console.log(employees);
        return employees
          .find(employee =>
            employee.email === email
          )
      }))
  }
}
