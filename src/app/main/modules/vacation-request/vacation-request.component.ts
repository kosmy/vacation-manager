import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vacation, VacationStatus } from '../shared/models/vacation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionApiService } from '../shared/services/transaction-api.service';
import { Transaction } from '../shared/models/transaction';
import { flatMap } from 'rxjs/operators';
import { UserAPIService } from '../shared/services/user-api.service';
import { Employee } from '../shared/models/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})

export class VacationRequestComponent implements OnInit, OnDestroy {

  vacation: Vacation;
  transaction: Transaction;
  vacationRequestForm: FormGroup;
  currentUserId: Employee['id'];
  certainUser: Employee;
  amount: number;
  subscription: Subscription;
  addVacationSubscription: Subscription;

  constructor(private vacationAPIService: VacationAPIService,
    private userApiService: UserAPIService,
    private trans: TransactionApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.subscription = this.route.params.pipe(
      flatMap((params) => {
        this.currentUserId = params['id'];
        return this.userApiService.getUserById(this.currentUserId);
      })
    ).subscribe((user) => {
      this.certainUser = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    if (this.addVacationSubscription) {
      this.addVacationSubscription.unsubscribe();
    }
  }

  //count the difference between end and start dates
  countAmount(start, end) {
    if (start && end) {
      this.amount = this.vacationAPIService.vacationAmount(start, end);
    }
  }

  buildForm() {
    this.vacationRequestForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      comment: new FormControl()
    })
  }

  vacLength() {
    return this.vacationAPIService.changeVacationLength()
  }

  onSubmit(vacationRequestForm: FormGroup) {

    //create new Vacation
    this.vacation = new Vacation(
      this.currentUserId,
      vacationRequestForm.value.startDate,
      vacationRequestForm.value.endDate,
      VacationStatus.Pending,
      new Date(),
      false,
      this.certainUser,
      vacationRequestForm.value.comment,
    );

    //send Data
    console.log("this vacation", this.vacation)
    this.addVacationSubscription = this.vacationAPIService.addVacation(this.vacation)
      .subscribe(() => {
        this.vacation = new Vacation(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.vacLength();
        this.router.navigate(['main/profile', this.currentUserId])
      })
  }

}
