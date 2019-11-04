import { Component, OnInit } from '@angular/core';
import { Vacation, VacationStatus } from '../shared/models/vacation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionApiService } from '../shared/services/transaction-api.service';
import { Transaction } from '../shared/models/transaction';
import { flatMap } from 'rxjs/operators';
import { UserAPIService } from '../shared/services/user-api.service';
import { Employee } from '../shared/models/employee';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})

export class VacationRequestComponent implements OnInit {

  vacation: Vacation;
  transaction: Transaction;
  vacationRequestForm: FormGroup;
  certainUserId: string;
  certainUser: Employee;
  amount: number;

  constructor(private vacationAPIService: VacationAPIService,
    private userApiService: UserAPIService,
    private trans: TransactionApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.pipe(
      flatMap((params) => {
        this.certainUserId = params['id'];
        return this.userApiService.getUserById(this.certainUserId);
      })
    ).subscribe((user) => {
      this.certainUser = user;
    });
  }

  //count the difference between end and start dates
  countAmount(start, end) {
    if (start && end) {
      this.amount = this.vacationAPIService.vacationAmount(start, end);
    }
  }

  buildForm() {
    this.vacationRequestForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    })
  }

  onSubmit(vacationRequestForm: FormGroup) {

    //create new Vacation
    this.vacation = new Vacation(
      vacationRequestForm.value.start,
      vacationRequestForm.value.end,
      vacationRequestForm.value.comment,
      VacationStatus.Pending,
      new Date(),
      false,
      this.certainUser
    );

    //send Data
      this.vacationAPIService.addVacation(this.vacation)
    .subscribe(() => {
      this.vacation = new Vacation(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
      this.router.navigate(['main/profile', this.certainUserId])
    })
  }

}
