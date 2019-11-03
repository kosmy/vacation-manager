import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VacationAPIService } from '../../../shared/services/vacation-api.service';
import { Vacation } from '../../../shared/models/vacation';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserAPIService } from '../../../shared/services/user-api.service';

export const array = [
  {}
]

@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
  styleUrls: ['./user-vacations.component.scss'],
})

export class UserVacationsComponent implements OnInit {

  id: Employee["id"]
  // @ViewChild(MatPaginator, { statics: false }) paginator: MatPaginator;
  private paginator: MatPaginator;

@ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.dataSource.paginator = this.paginator;
}

  dataSource;
  userBalance: Employee["balance"];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['startDate', 'amount', 'type', 'status',];
  users: Employee[];

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
