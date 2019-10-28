import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserAPIService {

  constructor(private http: HttpClient) { }

  private userApiUrl = 'http://localhost:3000/users/';


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.userApiUrl + id);
  }

  editUser(user: User) {
    return this.http.put(this.userApiUrl + user.id, user);
  }

  addUser(user: User) {
    return this.http.post(this.userApiUrl, user);
  }


  // getVacationRequestsForUser(userId: number): Observable<any> {
  //   return this.http.get<Vacation[]>(this.vacationApiUrl).pipe(map((vacations) => {
  //     console.log(userId)
  //     console.log(vacations)
  //     vacations.filter(request => request.userId === userId);
  //     console.log(vacations)
  //   }))
  // }


  
}
