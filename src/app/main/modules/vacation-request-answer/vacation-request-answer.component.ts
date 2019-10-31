import { Component, OnInit, Inject, ViewEncapsulation, Optional } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { Vacation, VacationStatus } from '../shared/models/vacation';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacationRequestListComponent } from '../vacation-request-list/vacation-request-list.component';



@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VacationRequestAnswerComponent implements OnInit {

  request: Vacation;

  constructor(private userDataService: UserDataService, private vacationAPIService: VacationAPIService,
    public dialogRef: MatDialogRef<VacationRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vacation) { }

  ngOnInit() {
    this.request = this.data;
  }

  approve() {
    this.request.status = VacationStatus.Approved
    this.vacationAPIService.editVacation(this.request).subscribe();
    this.dialogRef.close();
  }
  refuse() {
    this.request.status = VacationStatus.Refused
    this.vacationAPIService.editVacation(this.request).subscribe();
    this.dialogRef.close();
  }
}
