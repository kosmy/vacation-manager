import { Injectable } from '@angular/core';
import { Vacation, VacationStatus } from '../models/vacation';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import * as moment from 'moment'
import { Team } from '../models/team';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class VacationAPIService {

  private vacationApiUrl = 'https://vacations.polytech.rocks:52540/api/Vacation/';
  calendarEvents: EventInput[] = [];
  changeTeamVacs = new Subject<EventInput[]>();

  constructor(private http: HttpClient) { }

  editVacation(request): Observable<Vacation> {
    return this.http.put<Vacation>(this.vacationApiUrl, request);
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

  changeVacationStatus(requestId, vacation){
    return this.http.put(this.vacationApiUrl + requestId + '/status', vacation);
  }

  vacationAmount(from, to) {
    const start = moment(from);
    const end = moment(to);
    return end.diff(start, 'days') + 1;
  }

  getAllVacations(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl);
  }

  getVacationsForTeam(id: Team['id']): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl + 'team/' + id);
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

  fillCalendar(vacation: Vacation) {
    this.calendarEvents.push(
      {
        title: `${vacation.employee.firstName} ${vacation.employee.surname}`,
        start: vacation.startDate,
        end: vacation.endDate,
        extendedProps: {
          vacation: vacation
        }
      }
    )
  }

  // changeVacationsForTeam(vacId: Vacation['id']) {
  //   this.calendarEvents = [];
  //   this.getVacationsForTeam(vacId).pipe(
  //     map((vacations) => {
  //       vacations.forEach((vacation) => {
  //         this.fillCalendar(vacation);
  //       })
  //       return this.calendarEvents;
  //     })
  //   ).subscribe((events) => {
  //     return this.changeTeamVacs.next(events);
  //   })
  // }
  changeVacationsForTeam(vacId: Vacation['id']) {
    this.calendarEvents = [];
    this.getVacationsForTeam(vacId).pipe(
      map((vacations) => {
        vacations.forEach((vacation) => {
          this.fillCalendar(vacation);
        })
        return this.calendarEvents;
      })
    ).subscribe((events) => {
      return this.changeTeamVacs.next(events);
    })
  }

}
