import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../shared/models/user';
import { Vacation } from '../../shared/models/vacation';
import { UserDataService } from '../../shared/services/user-data.service';
import { VacationAPIService } from '../../shared/services/vacation-api.service';
import { VacationRequestListComponent } from '../vacation-request-list.component';

@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss']
})
export class VacationRequestAnswerComponent implements OnInit {

  request: Vacation;

  constructor(private userDataService: UserDataService, private vacationAPIService: VacationAPIService,
    public dialogRef: MatDialogRef<VacationRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vacation) { }

  ngOnInit() {
    this.request = this.data;
  }

  // approve(request: Vacation) {
  //   this.vacationAPIService.approve(request);
  //   this.dialogRef.close();
  // }
  // refuse(request: Vacation) {
  //   this.vacationAPIService.refuse(request);
  //   this.dialogRef.close();
  // }
}
