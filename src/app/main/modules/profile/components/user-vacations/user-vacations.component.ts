import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { VacationAPIService } from '../../../shared/services/vacation-api.service';
import { Vacation } from '../../../shared/models/vacation';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { flatMap, map } from 'rxjs/operators';
import { forkJoin, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
  styleUrls: ['./user-vacations.component.scss'],
})
 
export class UserVacationsComponent implements OnInit, OnDestroy {

  private paginator: MatPaginator;


  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
 
  currentUserId: Employee['id'];
  dataSource: MatTableDataSource<Vacation>;
  userBalance: Employee["balance"];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['dates', 'status',];
  users: Employee[];
  getDataSubscription: Subscription;

  constructor(private vacationAPIService: VacationAPIService,
    private router: Router,
    private userAPIService: UserAPIService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDataSubscription = this.route.params.pipe(
      flatMap((params) => {
        this.currentUserId = params['id'];
        return forkJoin(
          this.userAPIService.getUserById(this.currentUserId),
          this.vacationAPIService.getVacationsForUser(this.currentUserId)
        )
      })
    ).subscribe((res) => {
      this.userBalance = res[0].balance;
      this.dataSource = new MatTableDataSource<Vacation>(res[1]);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    })
  }

  ngOnDestroy(): void {
    this.getDataSubscription.unsubscribe();
  }

  requestVacation() {
    this.router.navigate(['main/vacation-request', this.currentUserId])
  }

}
