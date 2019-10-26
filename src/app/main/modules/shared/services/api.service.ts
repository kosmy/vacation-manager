import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class APIService {

  constructor(private http: HttpClient) { }

  private userApiUrl = 'http://localhost:3000/users/';
  private teamApiUrl = 'http://localhost:3000/teams/';
  private vacationApiUrl = 'http://localhost:3000/vacations/'


  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.userApiUrl + id);
  }

  editUser(user: User) {
    return this.http.put(this.userApiUrl + user.id, user);
  }

  addUser(user: User) {
    return this.http.post(this.userApiUrl, user);
  }
}
