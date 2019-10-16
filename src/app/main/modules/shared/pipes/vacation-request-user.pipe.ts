import { Pipe, PipeTransform } from '@angular/core';
import { Vacation } from '../models/vacation';
import { UserDataService } from '../services/user-data.service';

@Pipe({
  name: 'userProp'
})
export class VacationRequestUserPipe implements PipeTransform {

  constructor(private userDataService: UserDataService) { }

  transform(userId?: Vacation["userId"], userProp?: string): any {
    switch (userProp) {
      case 'name':
        return `${this.userDataService.findUserById(userId).name} ${this.userDataService.findUserById(userId).surname}`;
        break;
      case 'team':
        return this.userDataService.findUserById(userId).team
        break;
      case 'balance':
        return this.userDataService.findUserById(userId).balance
        break;
    }
  }

}
