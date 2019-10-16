import { Component, OnInit, ViewChild} from '@angular/core';
import { Vacation } from '../shared/models/vacation';
import { VacationService } from '../shared/services/vacation.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-vacation-request-list',
  templateUrl: './vacation-request-list.component.html',
  styleUrls: ['./vacation-request-list.component.scss']
})
export class VacationRequestListComponent implements OnInit {
  @ViewChild (MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'team', 'vacationDates', 'amount', 'balance', 'status', 'action'];
  vacationsList: Vacation[];
  dataSource;

  

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<any>(this.vacationService.getAllVacationRequests());
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  decide() {
    
  }
}
