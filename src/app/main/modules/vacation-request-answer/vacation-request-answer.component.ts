import { Component, OnInit, Inject, ViewEncapsulation, Optional, OnDestroy } from '@angular/core';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacationRequestListComponent } from '../vacation-request-list/vacation-request-list.component';
import { UserAPIService } from '../shared/services/user-api.service';
import { Employee } from '../shared/models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vacation } from '../shared/models/vacation';
import { TransactionApiService } from '../shared/services/transaction-api.service';
import { AuthorizationService } from 'src/app/log-in/services/authorization.service';
import { Subscription, forkJoin } from 'rxjs';
import { Transaction } from '../shared/models/transaction';



@Component({
  selector: 'app-vacation-request-answer',
  templateUrl: './vacation-request-answer.component.html',
  styleUrls: ['./vacation-request-answer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VacationRequestAnswerComponent implements OnInit, OnDestroy {


  request: Vacation;
  user: Employee;
  isLoaded: boolean = false;
  requestAnswerForm: FormGroup;
  approver: Employee;
  amount: number;

  employeeSubscription: Subscription;
  approverSubscription: Subscription
  changeSubscription: Subscription;

  constructor(private userAPIService: UserAPIService,
    private vacationAPIService: VacationAPIService,
    private transactionAPIService: TransactionApiService,
    private dialogRef: MatDialogRef<VacationRequestListComponent>,
    private authService: AuthorizationService,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    if (this.data.event) {
      console.log(this.data.event.extendedProps.vacation);
      this.request = this.data.event.extendedProps.vacation
    }
    else {
      this.request = this.data;
      console.log(this.data)
    }
    this.employeeSubscription = this.userAPIService.getUserById(this.request.employeeId).subscribe((user) => {
      this.user = user;
      this.buildForm();
      this.fillInputs();
      this.isLoaded = true;
    });
    this.approverSubscription = this.userAPIService.getUserById(localStorage.getItem('userId')).subscribe((approver) => {
      this.approver = approver;
    })
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
    this.approverSubscription.unsubscribe();
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.requestAnswerForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      approverComment: new FormControl('', [Validators.required])
    })
  }
  fillInputs() {
    this.requestAnswerForm.patchValue(this.request);
    this.countAmount();
  }

  vacLength() {
    return this.vacationAPIService.changeVacationLength()
  }

  changePendingVacations() {
    return this.vacationAPIService.changeVacations()
  }
  //count the difference between end and start dates
  countAmount() {
    this.amount = this.vacationAPIService.vacationAmount(this.requestAnswerForm.value.startDate, this.requestAnswerForm.value.endDate);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  changeUserBalance() {
    if (this.requestAnswerForm.value.status === 1) {
      this.request.employee.balance -= this.amount;
    }
  }
  onSubmit(requestAnswerForm: FormGroup) {
    
    let approvedRequest: Vacation = null;

    if (+requestAnswerForm.value.status === 1) {
      approvedRequest = this.request;
    }
    this.request.startDate = requestAnswerForm.value.startDate;
    this.request.endDate = requestAnswerForm.value.endDate;
    this.request.status = +requestAnswerForm.value.status;
    this.request.approverId = this.approver.id;
    this.request.approver = this.approver;

    this.changeUserBalance();

    const transaction: Transaction = {
      employeeId: this.request.employeeId,
      change: this.amount,
      comment: this.requestAnswerForm.value.approverComment,
      employee: this.request.employee,
      vacations: [this.request]
    }

    this.changeSubscription = forkJoin(
      this.vacationAPIService.changeVacationStatus(this.request.id, this.request),
      // this.transactionAPIService.addTransaction(transaction),
      this.userAPIService.editUser(this.request.employee)
    ).subscribe(() => {
      this.request = new Vacation(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
      this.changePendingVacations();
      this.dialogRef.close();
    })
  }
}
