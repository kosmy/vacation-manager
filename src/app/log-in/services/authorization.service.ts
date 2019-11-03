import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorizationService {

  URL: string = 'https://vacations.polytech.rocks:52540'
  constructor(private http: HttpClient) { }

  singIn(userDetails: { email: string, password: string }) {
    const formData = new FormData();
    formData.append('username', userDetails.email);
    formData.append('password', userDetails.password);
    formData.append('client_id', 'api');
    formData.append('client_secret', 'vacationsecrets');
    formData.append('grant_type', 'password');

    return this.http.post(this.URL + '/connect/token', formData)
      .pipe(map((response) => {
          localStorage.setItem('auth_token', response['access_token']);
      }));
  }

  getUserId(email: string) {
    return this.http.get(this.URL + '/api/Employee').pipe(map((employees) => {
      return employees
    }))
  }


}
