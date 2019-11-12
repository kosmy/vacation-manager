import { Component, OnInit, Optional, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { ActivatedRoute } from '@angular/router';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacation } from '../../../shared/models/vacation';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit, OnDestroy {

  currentUser: Employee;
  isLoaded: boolean = false;
  getUserSubscription: Subscription;
  getUserModalSubscription: Subscription

  constructor(
    private userApiService: UserAPIService,
    private route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<UserInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.getUserFromList(this.data);
    }
    else {
      this.getUserSubscription = this.route.params.pipe(
        flatMap((params) => {
          const id = params['id'];
          return this.userApiService.getUserById(id);
        })
      ).subscribe((user) => {
        this.currentUser = user;
        this.isLoaded = true;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.getUserModalSubscription) {
      this.getUserModalSubscription.unsubscribe();
    }
    else if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
  }

  getUserFromList(data) {
    if (data.employeeId) {
      this.getUserModalSubscription = this.userApiService.getUserById(data.employeeId).subscribe((user) => {
        this.currentUser = user;
        this.isLoaded = true;
      })
    }
    else {
      this.currentUser = data;
      this.isLoaded = true;
    }
  }

}
