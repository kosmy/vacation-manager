import { Pipe, PipeTransform } from '@angular/core';
import { VacationAPIService } from '../services/vacation-api.service';
import { VacationType } from '../models/vacation';

@Pipe({
  name: 'vacationType'
})
export class VacationTypePipe implements PipeTransform {

  constructor( public vacationAPIService: VacationAPIService){};

  transform(type?: VacationType): any {
    return this.vacationAPIService.convertType(type)
  }

}
