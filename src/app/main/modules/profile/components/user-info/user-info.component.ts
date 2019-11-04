import { Component, OnInit, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { ActivatedRoute } from '@angular/router';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacation } from '../../../shared/models/vacation';
import { switchMap, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { VacationAPIService } from '../../../shared/services/vacation-api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {

  certainUser: Employee;
  isLoaded: boolean = false;
  isModal: boolean = false;

  constructor(
    private userApiService: UserAPIService,
    private route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<UserInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Vacation
  ) { }

  ngOnInit() {
    console.log('User Info Route', this.route)
    if (this.data) {
      this.getUserFromList(this.data);
      this.isModal = true;
      this.isLoaded = true;
    }
    else {
      this.route.params.pipe(
        flatMap((params) => {
          const id = params['id'];
          return this.userApiService.getUserById(id);
        })
      ).subscribe((user) => {
        this.certainUser = user;
        this.isLoaded = true;
      });
    }

  }

  getUserFromList(vacation: Vacation) {
    this.userApiService.getUserById(vacation.employeeId).subscribe((user) => {
      this.certainUser = user;
    })
  }

}
