import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { Vacation } from '../models/vacation';
import { UserDataService } from '../services/user-data.service';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/user';

@Pipe({
  name: 'userProp'
})
export class VacationRequestUserPipe implements PipeTransform {

  constructor(private userAPIService: UserAPIService) { }

  user: User;

  transform(userId?: Vacation["userId"], userProp?: string): any {
    switch (userProp) {
      case 'name':
        this.getUserFromAPI(userId)
        return `${this.user.name} ${this.user.surname}`;
        break;
      case 'team':
        this.getUserFromAPI(userId)
        return `${this.user.team}`;
        break;
      case 'balance':
        this.getUserFromAPI(userId)
        return `${this.user.balance}`;
        break;
    }
  }

  getUserFromAPI(userId) {
    console.log(userId)
    let subscription = this.userAPIService.getUserById(userId).subscribe((user) => {
      console.log(user.name)
      this.user = user
    });
  }

}
