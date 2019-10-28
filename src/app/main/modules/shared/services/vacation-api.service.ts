import { Injectable } from '@angular/core';
import { Vacation, VacationStatus, VacationType } from '../models/vacation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class VacationAPIService {

  private vacationApiUrl = 'http://localhost:3000/vacations/';

  constructor(private http: HttpClient) { }

  // addVacationRequest(vacation: Vacation) {
  //   if (!localStorage.getItem('vacationRequests')) {
  //     localStorage.setItem('vacationRequests', JSON.stringify([]));
  //   }

  //   this.localVacationArray = this.getAllVacationRequests()
  //   this.localVacationArray.push(vacation);
  //   localStorage.setItem('vacationRequests', JSON.stringify(this.localVacationArray));
  // }

  // getVacationRequestsForUser(id: number) {
  //   return JSON.parse(localStorage.getItem('vacationRequests')).filter(request => request.userId === id);
  // }
  // getAllVacationRequests() {
  //   return JSON.parse(localStorage.getItem('vacationRequests'));
  // }

  // approve(vacationRequest: Vacation) {
  //   this.localVacationArray = this.getAllVacationRequests();
  //   this.localVacationArray.find(request => request.userId === vacationRequest.userId).status = VacationStatus.Approved;
  //   localStorage.setItem('vacationRequests', JSON.stringify(this.localVacationArray));
  // }

  // refuse(vacationRequest: Vacation) {
  //   this.localVacationArray = this.getAllVacationRequests();
  //   this.localVacationArray.find(request => request.userId === vacationRequest.userId).status = VacationStatus.Refused;
  //   localStorage.setItem('vacationRequests', JSON.stringify(this.localVacationArray));
  // }
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
