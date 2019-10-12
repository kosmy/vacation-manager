import { Pipe, PipeTransform } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { VacationStatus } from '../models/vacation';

@Pipe({
  name: 'vacationStatus'
})
export class VacationStatusPipe implements PipeTransform {

  constructor(public vacationService: VacationService) { };

  transform(status?: VacationStatus): any {
    return this.vacationService.convertStatus(status)
  }


}
