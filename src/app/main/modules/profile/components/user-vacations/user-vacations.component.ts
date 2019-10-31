import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDataService } from '../../../shared/services/user-data.service';
import { VacationAPIService } from '../../../shared/services/vacation-api.service';
import { Vacation } from '../../../shared/models/vacation';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const array = [
  {}
]

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

  id: User["id"]
  // @ViewChild(MatPaginator, { statics: false }) paginator: MatPaginator;
  private paginator: MatPaginator;

@ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.dataSource.paginator = this.paginator;
}

  dataSource;
  userBalance: User["balance"];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['startDate', 'amount', 'type', 'status',];
  // expandedElement: Vacation | null;
  users: User[];

  constructor(private vacationAPIService: VacationAPIService,
    private router: Router,
    private userAPIService: UserAPIService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.userVacationsList = this.vacationService.getVacationRequestsForUser(this.certainUser.id);
    // console.log(this.userVacationsList)
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getBalance();
      this.getVacations();
    })
  }

// get vacation balance for certain user
  getBalance() {
    this.userAPIService.getUserById(this.id).subscribe((user) => {
      this.userBalance = user.balance;
    })
  }
  
// get all vacation requests for certain user and fill the table
  getVacations() {
    this.vacationAPIService.getVacationsForUser(this.id).subscribe((vacations: Vacation[]) => {
      this.dataSource = new MatTableDataSource<any>(vacations);
      this.isLoaded = true;
    })
  }

  requestVacation() {
    this.router.navigate(['main/vacation-request', this.id])
  }

}
