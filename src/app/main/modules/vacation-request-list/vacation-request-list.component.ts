import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Vacation } from '../shared/models/vacation';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../profile/components/user-info/user-info.component';
import { Employee } from '../shared/models/employee';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';
import { TransactionApiService } from '../shared/services/transaction-api.service';
import { UserAPIService } from '../shared/services/user-api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-vacation-request-list',
  templateUrl: './vacation-request-list.component.html',
  styleUrls: ['./vacation-request-list.component.scss'],

})
export class VacationRequestListComponent implements OnInit,OnDestroy {
  


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['name', 'team', 'vacationDates', 'amount', 'balance', 'status', 'action'];
  vacationsList: Vacation[];
  dataSource;
  isLoaded: boolean = false;
  toUser: Employee;
  pendingSubscription: Subscription
  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private vacationAPIService: VacationAPIService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.changePendingVacations();
    this.pendingSubscription =  this.vacationAPIService.pendingVacations.subscribe((vacations) => {
      this.dataSource = new MatTableDataSource<any>(vacations);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    })
  }
  ngOnDestroy(): void {
    this.pendingSubscription.unsubscribe();
  }

  changePendingVacations() {
    return this.vacationAPIService.changeVacations();
  }
  vacLength() {
    return this.vacationAPIService.changeVacationLength()
  }

  answerTheRequest(vacation: Vacation) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: vacation
    }).afterClosed()
      .subscribe(() => {
        this.vacLength;
      });
  }

  showProfile(vacation: Vacation) {
    this.dialog.open(UserInfoComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: vacation
    });
  }
}
