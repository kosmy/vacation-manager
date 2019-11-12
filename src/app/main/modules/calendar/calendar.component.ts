import { Component, OnInit, ViewChild, AfterViewInit, DoCheck, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserAPIService } from '../shared/services/user-api.service';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { Vacation } from '../shared/models/vacation';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';
import { Observable, Subscription } from 'rxjs';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;

  calendarEvents: EventInput[];
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  vacations: Vacation[];
  teams$: Observable<Team[]>;
  selected: Team['id'] = '75fa16ee-760c-48b0-bb40-b8e61988f604';
  changeTeamSubscription: Subscription;
  calendarSubscription: Subscription;
  getVacsSubscription: Subscription;

  constructor(
    private vacationAPIService: VacationAPIService,
    private dialog: MatDialog,
    private teamAPIService: TeamAPIService
  ) { }

  ngOnInit(): void {
    this.getVacsSubscription =  this.vacationAPIService.getAllVacations().subscribe((vacs) => {
      console.log(vacs)
    })
    this.teams$ = this.teamAPIService.getAllTeams();
    this.changeVacationsForTeam('75fa16ee-760c-48b0-bb40-b8e61988f604');
    this.changeTeamSubscription = this.vacationAPIService.teamVacs.subscribe((calendarEvents) => {
      this.calendarEvents = calendarEvents;
    }) 
  }

  ngAfterViewInit(): void {
    this.calendarSubscription = this.calendarComponent.eventClick.subscribe((data) => {
      this.openDialog(data);
    })
  }

  ngOnDestroy(): void {
    this.changeTeamSubscription.unsubscribe();
    this.calendarSubscription.unsubscribe();
    this.getVacsSubscription.unsubscribe();
  }

  changeVacationsForTeam(value) {
    return this.vacationAPIService.changeVacationsForTeam(value);
  }

  // getData() {
  //   this.vacationAPIService.getAllVacations().pipe(switchMap((vacations) =>
  //     forkJoin(...vacations.map((vacation) =>
  //       this.userAPIService.getUserById(vacation.employeeId).pipe(tap((user) =>
  //         this.fillCalendar(vacation, user)
  //       ))))
  //   )).subscribe(() => {
  //     this.isLoaded = true;
  //   });
  // }

  openDialog(data) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      data: data
    });
  }

}
