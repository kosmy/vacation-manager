import { Component, OnInit } from '@angular/core';
import { VacationType, Vacation, VacationStatus } from '../shared/models/vacation';
import { FormGroup, FormControl } from '@angular/forms';
import { VacationService } from '../shared/services/vacation.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit {

  vacationTypes = [{ value: VacationType.Recreation, text: "Recreation" },{ value: VacationType.University, text: "University" },{ value: VacationType.Family, text: "Family"}, { value: VacationType.Sick, text: "Sick" }];
  vacationRequest: Vacation;

  vacationRequestForm: FormGroup;

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.vacationRequestForm = new FormGroup({
      type: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      comment: new FormControl()
    })
  }
  onSubmit(vacationRequestForm: FormGroup) {
    this.vacationRequest = new Vacation( 1, 
      vacationRequestForm.value.type, 
      vacationRequestForm.value.start, 
      vacationRequestForm.value.end,
      vacationRequestForm.value.comment, 
      VacationStatus.Pending);

      this.vacationService.addVacationRequest(this.vacationRequest);

    console.log(this.vacationRequest)
  }

}
