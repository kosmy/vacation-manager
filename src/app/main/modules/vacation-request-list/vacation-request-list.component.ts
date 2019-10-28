import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacation } from '../shared/models/vacation';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VacationRequestAnswerComponent } from './vacation-request-answer/vacation-request-answer.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-vacation-request-list',
  templateUrl: './vacation-request-list.component.html',
  styleUrls: ['./vacation-request-list.component.scss']
})
export class VacationRequestListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['name', 'team', 'vacationDates', 'amount', 'balance', 'status', 'action'];
  // displayedColumns: string[] = ['vacationDates', 'amount', 'status', 'action'];

  vacationsList: Vacation[];
  dataSource;
  isLoaded: boolean = false;


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
    // this.dataSource.paginator = this.paginator;
  }

  // get all vacation requests for all users
  getVacations() {
    this.vacationAPIService.getAllVacations().subscribe((vacations) => {
      this.dataSource = new MatTableDataSource<any>(vacations)
    });
  }

  decide(request: Vacation) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: '800px',
      data: request
    });
  }
}
