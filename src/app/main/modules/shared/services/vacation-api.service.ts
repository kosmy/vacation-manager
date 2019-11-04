import { Injectable } from '@angular/core';
import { Vacation, VacationStatus } from '../models/vacation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class VacationAPIService {

  private vacationApiUrl = 'https://vacations.polytech.rocks:52540/api/Vacation';

  constructor(private http: HttpClient) { }

  editVacation(request) {
    return this.http.put(this.vacationApiUrl, request);
  }

  addVacation(vacation: Vacation): Observable<Vacation> {
    return this.http.post<Vacation>(this.vacationApiUrl, vacation);
  }

  getVacationsForUser(userId: Employee['id']): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl).pipe(
      map(vacations =>
        vacations
          .filter(item =>
            item.employeeId === userId
          )
      ))
  }

  vacationAmount(from, to) {
    const start = moment(from);
    const end = moment(to);
    return end.diff(start, 'days') + 1;
  }

  getAllVacations(): Observable<any> {
    return this.http.get<any>(this.vacationApiUrl);
  }

  convertStatus(status: VacationStatus) {
    switch (status) {
      case (0):
        return "Pending"
        break;
      case (1):
        return "Approved"
        break;
      case (2):
        return "Refused"
        break;
      default:
        return "Unknown"
    }
  }

}
