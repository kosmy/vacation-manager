import { Injectable } from '@angular/core';
import { Vacation, VacationStatus, VacationType } from '../models/vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  localVacationArray: Vacation[] = [];

  constructor() { }

  addVacationRequest(vacation: Vacation) {
    if (!localStorage.getItem('vacationRequests')) {
      localStorage.setItem('vacationRequests', JSON.stringify([]));
    }

    this.localVacationArray = JSON.parse(localStorage.getItem('vacationRequests'));
    this.localVacationArray.push(vacation);
    localStorage.setItem('vacationRequests', JSON.stringify(this.localVacationArray));

  }

  getVacationRequests() {
    return JSON.parse(localStorage.getItem('vacationRequests'));
  }

  convertStatus(status: VacationStatus) {
    switch (status) {
      case (0):
        return "Pending"
        break;
      case (1):
        return "Approved"
        break;
      case (2):
        return "Rejected"
        break;
      default:
        return "Unknown"
    }
  }

  convertType(type: VacationType) {
    switch (type) {
      case (0):
        return "Recreation"
        break;
      case (1):
        return "University"
        break;
      case (2):
        return "Family"
        break;
      case (3):
        return "Sick"
        break;
      default:
        return "Unknown"
    }
  }

}
