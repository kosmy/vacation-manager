import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacation } from '../shared/models/vacation';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../profile/components/user-info/user-info.component';
import { User } from '../shared/models/user';
import { UserAPIService } from '../shared/services/user-api.service';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';


@Component({
  selector: 'app-vacation-request-list',
  templateUrl: './vacation-request-list.component.html',
  styleUrls: ['./vacation-request-list.component.scss']
})
export class VacationRequestListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['name', 'team', 'vacationDates', 'amount', 'balance', 'status', 'action'];
  vacationsList: Vacation[];
  dataSource;
  isLoaded: boolean = false;
  toUser: User;


  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private vacationAPIService: VacationAPIService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getVacations();
    this.isLoaded = true;
    // this.dataSource.sort = this.sort;
  }

  // get all vacation requests for all users
  getVacations() {
    this.vacationAPIService.getAllVacations().subscribe((vacations) => {
      this.dataSource = new MatTableDataSource<any>(vacations)
    });
  }

  decide(vacation: Vacation) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: vacation
    });
  }
  showProfile(vacation: Vacation) {
    // this.userAPIService.getUserById(1).subscribe((user) => {
    //   this.toUser = user
    // });
    this.dialog.open(UserInfoComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: vacation
    });
  }
}
