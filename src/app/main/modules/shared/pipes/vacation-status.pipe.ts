import { Pipe, PipeTransform } from '@angular/core';
import { VacationAPIService } from '../services/vacation-api.service';
import { VacationStatus } from '../models/vacation';

@Pipe({
  name: 'vacationStatus'
})
export class VacationStatusPipe implements PipeTransform {

  constructor(public vacationAPIService: VacationAPIService) { };

  transform(status?: VacationStatus): any {
    return this.vacationAPIService.convertStatus(status)
  }


}
