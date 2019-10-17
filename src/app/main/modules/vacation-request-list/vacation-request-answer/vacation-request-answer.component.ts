import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../shared/models/user';
import { Vacation } from '../../shared/models/vacation';
import { UserDataService } from '../../shared/services/user-data.service';
import { VacationService } from '../../shared/services/vacation.service';
import { AddUserComponent } from '../../add-user/add-user.component';

@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss']
})
export class VacationRequestAnswerComponent implements OnInit {

  request: Vacation;

  constructor(
    private userDataService: UserDataService,
    private vacationService: VacationService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vacation) { }

  ngOnInit() {
    this.request = this.data;
  }

  approve(request: Vacation) {
    this.vacationService.approve(request);
    this.dialogRef.close();
  }
  refuse(request: Vacation) {
    this.vacationService.refuse(request);
    this.dialogRef.close();
  }
}
