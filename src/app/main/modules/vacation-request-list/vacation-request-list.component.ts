import { Component, OnInit } from '@angular/core';
import { Vacation } from '../shared/models/vacation';
import { VacationService } from '../shared/services/vacation.service';
import { User } from '../shared/models/user';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-vacation-request-list',
  templateUrl: './vacation-request-list.component.html',
  styleUrls: ['./vacation-request-list.component.scss']
})
export class VacationRequestListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'team', 'vacationDates', 'amount', 'vacationsAvailable', 'action'];
  vacationsList: Vacation[];
  allUsers: User[];
  neededUsers: User[];

  constructor(private vacationService: VacationService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.vacationsList = this.vacationService.getAllVacationRequests();
    console.log(this.vacationsList)

    this.allUsers = this.userDataService.getUsers();
    this.filter();
    console.log(this.neededUsers)
  }

  filter() {
    // можно через map
    for (let vacation of this.vacationsList) {
      this.neededUsers = this.allUsers.filter(user => user.id === vacation.userId)
    }
  }

}
