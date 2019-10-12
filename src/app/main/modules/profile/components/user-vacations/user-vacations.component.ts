import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDataService } from '../../../shared/services/user-data.service';
import { VacationService } from '../../../shared/services/vacation.service';
import { Vacation } from '../../../shared/models/vacation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
  styleUrls: ['./user-vacations.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserVacationsComponent implements OnInit {

  displayedColumns: string[] = ['startDate', 'type', 'status',];
  // expandedElement: Vacation | null;
  userVacationsAvailable: number;
  userVacationsList: Vacation[];

  constructor(private userDataService: UserDataService, private vacationService: VacationService, private router: Router) { }

  ngOnInit() {
    this.userVacationsAvailable = this.userDataService.findCertainUser(1).vacationsAvailable;
    this.userVacationsList = this.vacationService.getVacationRequests();
  }

  requestVacation() {
    this.router.navigate(['main/vacation-request'])
  }
}
