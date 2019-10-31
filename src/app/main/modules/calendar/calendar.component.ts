import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserAPIService } from '../shared/services/user-api.service';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { User } from '../shared/models/user';
import { Vacation } from '../shared/models/vacation';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';





@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;


  calendarEvents: EventInput[] = [];
  calendarPlugins = [dayGridPlugin, interactionPlugin, timeGridPlugin];
  user: User;
  vacations: Vacation[];
  isLoaded: boolean = false;

  start = '2019-11-10T22:00:00.000Z';
  eventSubscribtion: any;
  // end = '2019-11-10';

  constructor(private userAPIService: UserAPIService, private vacationAPIService: VacationAPIService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getData()
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
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
        end: vacation.endDate
      }
    )
  }

  getData()  {
    this.vacationAPIService.getAllVacations().subscribe((vacations) => {
      vacations.forEach((vacation) => {
        this.userAPIService.getUserById(vacation.userId).subscribe((user) => {
          this.fillCalendar(vacation, user)
        });
      })
    })
  }
  ngAfterViewInit(): void {
    this.eventSubscribtion = this.calendarComponent.eventClick.subscribe(
      data => {
        this.openDialog(data);
      }
    )
  }
  openDialog(data) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      data: data
    });
  }

}
