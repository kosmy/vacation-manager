import { Component, OnInit, Inject, ViewEncapsulation, Optional } from '@angular/core';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacationRequestListComponent } from '../vacation-request-list/vacation-request-list.component';
import { UserAPIService } from '../shared/services/user-api.service';
import { Employee } from '../shared/models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vacation } from '../shared/models/vacation';
import { TransactionApiService } from '../shared/services/transaction-api.service';
import { AuthorizationService } from 'src/app/log-in/services/authorization.service';



@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VacationRequestAnswerComponent implements OnInit {

  request: Vacation;
  user: Employee;
  isLoaded: boolean = false;
  requestAnswerForm: FormGroup;
  approver: Employee;

  constructor(private userAPIService: UserAPIService,
    private vacationAPIService: VacationAPIService,
    private transactionAPIService: TransactionApiService,
    private dialogRef: MatDialogRef<VacationRequestListComponent>,
    private authService: AuthorizationService,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    if (this.data.event) {
      console.log(this.data)
      this.request = this.data.event.extendedProps.vacation
    }
    else {
      console.log(this.data)
      this.request = this.data
    }
    this.userAPIService.getUserById(this.request.employeeId).subscribe((user) => {
      this.user = user;
      this.buildForm();
      this.fillInputs();
      this.isLoaded = true;
    });
    this.userAPIService.getUserById(localStorage.getItem('userId')).subscribe((approver) => {
      console.log(approver);
      this.approver = approver;
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

  onSubmit(requestAnswerForm: FormGroup) {
    // this.request.startDate = requestAnswerForm.value.startDate;
    // this.request.endDate = requestAnswerForm.value.endDate;
    this.request.status = +requestAnswerForm.value.status;
    // this.request.approverId = this.approver.id;
    // this.request.approver = this.approver;

    console.log(this.request)
    // this.vacationAPIService.editVacation(this.request).subscribe( () => {
    //   this.request = new Vacation(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    // });
    this.vacationAPIService.changeVacationStatus(this.request.id, this.request).subscribe(() => {
      this.request = new Vacation(null, null, null, null, null, null, null, null, null);
    })
  }
}
