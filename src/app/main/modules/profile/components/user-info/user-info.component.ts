import { Component, OnInit, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { ActivatedRoute } from '@angular/router';
import { UserAPIService } from '../../../shared/services/user-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacation } from '../../../shared/models/vacation';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class UserInfoComponent implements OnInit {

  // @Input() certainUser: User;
  certainUser: Employee;
  allUsers: Employee[];
  isLoaded: boolean = false;
  isModal: boolean = false;

  constructor(
    private userApiService: UserAPIService,
    private route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<UserInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Vacation
    ) { }

  ngOnInit() {
    if (this.data) {
      this.getUserFromList(this.data);
      this.isModal = true;
      this.isLoaded = true;
    }
    else {
      this.route.params.subscribe((params) => {
        const id = +params["id"];
        this.userApiService.getUserById(id).subscribe((user) => {
          this.certainUser = user;
          this.isLoaded = true
        });
      })
    }
  }

  getUserFromList(vacation: Vacation) {
    this.userApiService.getUserById(vacation.userId).subscribe((user) => {
      console.log("UserFromData", user)
      this.certainUser = user;
      console.log("CertainUser", this.certainUser)
    })
  }

}
