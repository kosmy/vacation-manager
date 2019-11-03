import { Component, OnInit, Inject, ViewEncapsulation, Optional } from '@angular/core';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacationRequestListComponent } from '../vacation-request-list/vacation-request-list.component';
import { UserAPIService } from '../shared/services/user-api.service';
import { Employee } from '../shared/models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VacationRequestAnswerComponent implements OnInit {

  request;
  user: Employee;
  isLoaded: boolean = false;
  requestAnswerForm: FormGroup;
  answer: number;

  fromCalendar

  constructor(private userAPIService: UserAPIService, private vacationAPIService: VacationAPIService,
    public dialogRef: MatDialogRef<VacationRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    // this.fromCalendar = this.request.event.extendedProps.vacation;
    if (this.data.event) {
      this.request = this.data.event.extendedProps.vacation
    }
    else {
      this.request = this.data
    }
    this.userAPIService.getUserById(this.request.userId).subscribe((user) => {
      this.user = user;
      this.buildForm();
      this.fillInputs();
      this.isLoaded = true;
    })
  }

  buildForm() {
    this.requestAnswerForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    })
  }
  fillInputs() {
    this.requestAnswerForm.patchValue(this.request);
  }

  // approve() {
  //   this.request.status = VacationStatus.Approved
  //   this.vacationAPIService.editVacation(this.request).subscribe();
  //   this.dialogRef.close();
  // }
  // refuse() {
  //   this.request.status = VacationStatus.Refused
  //   this.vacationAPIService.editVacation(this.request).subscribe();
  //   this.dialogRef.close();
  // }

  onSubmit(requestAnswerForm: FormGroup) {
    this.request.startDate = requestAnswerForm.value.startDate;
    this.request.endDate = requestAnswerForm.value.endDate;
    this.request.status = +requestAnswerForm.value.status;

    this.vacationAPIService.editVacation(this.request).subscribe();

    this.requestAnswerForm.reset();
    this.requestAnswerForm.markAsUntouched();
    Object.keys(this.requestAnswerForm.controls).forEach(name => {
      let control = this.requestAnswerForm.controls[name];
      control.setErrors(null);
    });
  }
}
