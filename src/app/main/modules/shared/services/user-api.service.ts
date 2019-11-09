import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';

@Injectable()
export class UserAPIService {

  constructor(private http: HttpClient) { }

  private userApiUrl = 'https://vacations.polytech.rocks:52540/api/Employee/';


  getAllUsers(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.userApiUrl);
  }

  getUserById(id: Employee['id']): Observable<Employee> {
    return this.http.get<Employee>(this.userApiUrl + id);
  }

  editUser(user: Employee) {
    return this.http.put(this.userApiUrl, user); 
  }

  addUser(user: Employee) {
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
