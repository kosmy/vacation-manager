import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VacationAPIService } from '../../../shared/services/vacation-api.service';
import { Vacation } from '../../../shared/models/vacation';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { flatMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
  styleUrls: ['./user-vacations.component.scss'],
})

export class UserVacationsComponent implements OnInit {

  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  certainUserId: Employee['id'];
  dataSource: MatTableDataSource<Vacation>;
  userBalance: Employee["balance"];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['dates', 'status',];
  users: Employee[];

  constructor(private vacationAPIService: VacationAPIService,
    private router: Router,
    private userAPIService: UserAPIService,
    private route: ActivatedRoute) { }

  ngOnInit() {    
    this.route.params.pipe(
      flatMap((params) => {
        this.certainUserId = params['id'];
        return forkJoin(
          this.userAPIService.getUserById(this.certainUserId),
          this.vacationAPIService.getVacationsForUser(this.certainUserId)
        )
      })
    ).subscribe((res) => {
      this.userBalance = res[0].balance;
      this.dataSource = new MatTableDataSource<Vacation>(res[1]);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    })
  }


  // get vacation balance for certain user
  getBalance(id) {
    this.userAPIService.getUserById(id)
  }

  // get all vacation requests for certain user and fill the table
  getAllVacations() {
    this.vacationAPIService.getAllVacations()
  }

  requestVacation() {
    this.router.navigate(['main/vacation-request', this.certainUserId])
  }

}
