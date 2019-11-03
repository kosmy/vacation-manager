import { Injectable } from '@angular/core';
import { Vacation, VacationStatus, VacationType } from '../models/vacation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class VacationAPIService {

  private vacationApiUrl = 'http://localhost:3000/vacations/';

  constructor(private http: HttpClient) { }

  editVacation(request) {
    return this.http.put(this.vacationApiUrl + request.id, request);
  }

  addVacation(vacation: Vacation): Observable<Vacation> {
    return this.http.post<Vacation>(this.vacationApiUrl, vacation);
  }

  getVacationsForUser(userId: number): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl).pipe(
      map((items) => {
        return items
          .filter((item) => {
            return item.userId === userId
          })
      }))
  }

  getAllVacations(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl);
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

  convertType(type: VacationType) {
    switch (type) {
      case (0):
        return "Recreation"
        break;
      case (1):
        return "University"
        break;
      case (2):
        return "Family"
        break;
      case (3):
        return "Sick"
        break;
      default:
        return "Unknown"
    }
  }

}
