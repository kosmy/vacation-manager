import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { forkJoin } from 'rxjs';
import { UserAPIService } from '../shared/services/user-api.service';


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
  toUser: Employee;


  // ids = [
  //   [{id: "ea5a0c1c-8185-40a6-9a83-09b1ea33fa53", firstName: "Mykola", surname: "Ryabchenko",…},…]
  //   0: {id: "ea5a0c1c-8185-40a6-9a83-09b1ea33fa53", firstName: "Mykola", surname: "Ryabchenko",…}
  //   1: {id: "653d6b42-459c-4054-bca2-31ce2229c6cd", firstName: "Pidgey", surname: "Flying", avatar: null,…}
  //   2: {id: "db6bf823-86e8-413e-9132-3976ae24c72f", firstName: "Bulbasaur", surname: "Generation",…}
  //   3: {id: "ea7fb100-421c-42d4-b577-42fdba060b06", firstName: "sdf", surname: "fdghdfghdfgh", avatar: null,…}
  //   4: {id: "4f48fb3d-f048-4c1d-bc0f-4582e9c43378", firstName: "Ruslan", surname: "Molot", avatar: "string",…}
  //   5: {id: "922a9929-cb1a-4150-b965-65ac83c3d845", firstName: "Wartortle", surname: "Water", avatar: null,…}
  //   6: {id: "46fd821b-457c-41e3-96e1-80bd4d174890", firstName: "Charizard", surname: "Fire Flying",…}
  //   7: {id: "8886d9ae-a655-4c57-8b6e-af60be04a529", firstName: null, surname: "test", avatar: null,…}
  //   8: {id: "8886d9ae-a655-4c57-8b6e-af60be04a530", firstName: "asf", surname: "fghjghfj", avatar: null,…}
  //   9: {id: "77a20005-ede0-48d9-8d5a-afd1a5b7d93c", firstName: "test111", surname: "test111", avatar: null,…}
  //   10: {id: "5ef6d773-ab92-49a3-be8b-bf5bb5648d02", firstName: null, surname: null, avatar: null,…}
  //   11: {id: "5c95e70b-84c4-4db7-bd00-d5a3ed9714d2", firstName: "Andriy", surname: "Kedrov",…}
  //   12: {id: "4204d088-cca9-4813-b437-db0b0270bca7", firstName: "Ruslan", surname: "Molodyko",…}
  //   13: {id: "7df48c00-14bc-4a57-869d-dd97ec1e8e77", firstName: "Andriy", surname: "Kedrov",…}
  //   14: {id: "7e8e47b6-8135-4ae5-95c3-e4ff43db1b91", firstName: "testsdgdfg", surname: "dgfhgfhfgh",…}
  //   15: {id: "565bd115-3bf9-4091-8144-f62679a2188f", firstName: null, surname: "testTest", avatar: null,…}
  //   16: {id: "240e89c9-728a-4966-b302-f9062acb389f", firstName: "Nikita", surname: "Kostash", avatar: null,…}
  //   17: {id: "4cea5a26-5fc2-4d8d-89f7-f90a6947efd5", firstName: "Vasyl", surname: "Tanovskyi",…}
  // ]

  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private vacationAPIService: VacationAPIService,
    private dialog: MatDialog,
    private transactionAPIService: TransactionApiService,
    private userAPIService: UserAPIService) { }

  ngOnInit() {
    this.getVacations();
    // this.dataSource.sort = this.sort;
  } 

  // get all vacation requests for all users
  getVacations() {
    forkJoin(
      this.vacationAPIService.getAllVacations(),
      this.userAPIService.getAllUsers()
    ).subscribe((res) => {
      res[0].forEach((vacation) => {
        res[1].forEach((user) => {
          if (vacation.employee.id === user.id) {
            if (user.teams.length !== 0) {
              vacation.employee.teams = [];
              vacation.employee.teams[0] = user.teams[0];
              console.log("TEAMS", vacation.employee.teams[0])
            }
            // else {
            //   vacation.employee.teams = [ ];
            // }
            vacation.employee.balance = user.balance;
          }
        })
      })
      this.dataSource = new MatTableDataSource<any>(res[0]);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    })



    this.vacationAPIService.getAllVacations().subscribe((vacations: Vacation[]) => {
      // this.transactionAPIService.getEmpoyeeTransactions()
      
    });
  }

  answerTheRequest(vacation: Vacation) {
    const dialogRef = this.dialog.open(VacationRequestAnswerComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: vacation
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
