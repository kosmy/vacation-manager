import { Injectable } from '@angular/core';
import { Vacation, VacationStatus } from '../models/vacation';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import * as moment from 'moment'
import { Team } from '../models/team';
import { EventInput } from '@fullcalendar/core';
import { UserAPIService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class VacationAPIService {

  private vacationApiUrl = 'https://vacations.polytech.rocks:52540/api/Vacation/';
  calendarEvents: EventInput[] = [];

  teamVacs = new Subject<EventInput[]>();
  vacationCount = new Subject<any>();
  pendingVacations = new Subject<Vacation[]>();


  constructor(
    private http: HttpClient,
    private userAPIService: UserAPIService
  ) { }

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

  changeVacationStatus(requestId: Vacation['id'], vacation: Vacation) {
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

  getPendingVacations(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationApiUrl + 'pending');
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

  changeVacationLength() {
    return this.getPendingVacations().pipe(
      map((vacations: Vacation[]) => {
        return vacations
      }))
      .subscribe((vacs) => {
        console.log(vacs.length);
        return this.vacationCount.next(vacs.length);
      })
  }

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
      return this.teamVacs.next(events);
    })
  }

  changeVacations() {
    forkJoin(
      this.getPendingVacations(),
      this.userAPIService.getAllUsers()
    ).pipe(map((res) => {
      res[0]
        .forEach((vacation) => {
          res[1]
            .forEach((user) => {
              if (vacation.employee.id === user.id) {
                if (user.teams.length !== 0) {
                  vacation.employee.teams;
                  vacation.employee.teams = user.teams;
                  console.log("TEAMS", vacation.employee.teams[0])
                }
                vacation.employee.balance = user.balance;
              }
            })
        })
        return res[0];
    }))
      .subscribe((vacations) => {
        return this.pendingVacations.next(vacations);
      })
    // .subscribe((res) => {
    //   res[0].forEach((vacation) => {
    //     res[1].forEach((user) => {
    //       if (vacation.employee.id === user.id) {
    //         if (user.teams.length !== 0) {
    //           vacation.employee.teams;
    //           vacation.employee.teams = user.teams;
    //           console.log("TEAMS", vacation.employee.teams[0])
    //         }
    //         vacation.employee.balance = user.balance;
    //       }
    //     })
    //   })
    // })
  }

  // changePendingVacations() {
  //   return this.getPendingVacations().pipe(
  //     map((vacations: Vacation[]) => {

  //   }))
  // }

}
