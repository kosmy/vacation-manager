import { Component, OnInit } from '@angular/core';
import { VacationType, Vacation, VacationStatus } from '../shared/models/vacation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VacationAPIService } from '../shared/services/vacation-api.service';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit {

  vacationTypes = [{ value: VacationType.Recreation, text: "Recreation" },{ value: VacationType.University, text: "University" },{ value: VacationType.Family, text: "Family"}, { value: VacationType.Sick, text: "Sick" }];
  vacation: Vacation;
  vacationRequestForm: FormGroup;
  userId: number;

  constructor(private vacationAPIService: VacationAPIService, private router: Router, private userDataService: UserDataService) { }

  ngOnInit() {
    this.buildForm();
    this.userId = 6;
  }

  buildForm() {
    this.vacationRequestForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    })
  }
  onSubmit(vacationRequestForm: FormGroup) {
    this.vacation = new Vacation(this.userId, 
      vacationRequestForm.value.start, 
      vacationRequestForm.value.end,
      vacationRequestForm.value.amount,
      vacationRequestForm.value.comment, 
      VacationStatus.Pending);

      this.vacationAPIService.addVacation(this.vacation).subscribe();
      this.router.navigate(['main/profile', this.userDataService.getUserId()])
    
    console.log(this.vacation)
  }

}
