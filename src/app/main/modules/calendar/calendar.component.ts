import { Component, OnInit, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserAPIService } from '../shared/services/user-api.service';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { User } from '../shared/models/user';
import { Vacation } from '../shared/models/vacation';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput, preventDefault } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';





@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {



  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;


  calendarEvents: EventInput[] = [];
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  user: User;
  vacations: Vacation[];
  isLoaded: boolean = false;

  constructor(private userAPIService: UserAPIService, private vacationAPIService: VacationAPIService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calendarComponent.eventClick.subscribe((data) => {
        this.openDialog(data);
        console.log(data)
      })
    }, 1000);
  }

  // getData() {
  //   this.vacationAPIService.getVacationsForUser(1).subscribe((vacations) => {
  //     this.vacations = vacations
  //     this.fillCalendar(vacations)
  //     this.isLoaded = true;
  //   })
  // }

  fillCalendar(vacation: Vacation, user: User) {
    this.calendarEvents.push(
      {
        title: `${user.name} ${user.surname}`,
        start: vacation.startDate,
        end: vacation.endDate,
        extendedProps: {
          vacation: vacation
        }
      }
    )
  }

  getData() {
    this.vacationAPIService.getAllVacations().pipe(switchMap((vacations) =>
      forkJoin(...vacations.map((vacation) =>
        this.userAPIService.getUserById(vacation.userId).pipe(tap((user) =>

          this.fillCalendar(vacation, user)
        ))))
    )).subscribe(() => {
      this.isLoaded = true;
    });
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      data: data
    });
  }

}
