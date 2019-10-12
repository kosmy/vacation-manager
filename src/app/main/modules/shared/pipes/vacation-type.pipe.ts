import { Pipe, PipeTransform } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { VacationType } from '../models/vacation';

@Pipe({
  name: 'vacationType'
})
export class VacationTypePipe implements PipeTransform {

  constructor( public vacationService: VacationService){};

  transform(type?: VacationType): any {
    return this.vacationService.convertType(type)
  }

}
