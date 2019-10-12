import { Injectable } from '@angular/core';
import { User, WorkStatus } from '../models/user';

@Injectable()
export class UserDataService {

  localUsers: User[];
  private users: User[] = [
    {
      id: 1,
      name: 'Nikita',
      surname: 'Kostash',
      birthday: new Date(2011, 0, 1, 0, 0, 0, 0),
      workEmail: 'abc@asdasd.com',
      email: 'dsfsf@sfdg.com',
      phone: '0931234567',
      skype: 'qwerty',
      vacationsAvailable: 15,
      startDate: new Date(2016, 9, 15, 7, 46, 36, 500),
      workStatus: WorkStatus.active,
      team: 'Angular Team',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
    },
    {
      id: 2,
      name: 'Andrey',
      surname: 'Shevchuk',
      birthday: new Date(1995, 11, 26, 11, 57, 36, 500),
      workEmail: 'abc@asdasd.com',
      email: 'dsfsf@sfdg.com',
      phone: '0931234567',
      skype: 'qwerty',
      vacationsAvailable: 15,
      startDate: new Date(2016, 9, 15, 7, 46, 36, 500),
      workStatus: WorkStatus.active,
      team: 'Angular Team',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
    },
    {
      id: 3,
      name: 'Denis',
      surname: 'Voychenko',
      birthday: new Date(1995, 11, 26, 11, 57, 36, 500),
      workEmail: 'abc@asdasd.com',
      email: 'dsfsf@sfdg.com',
      phone: '0931234567',
      skype: 'qwerty',
      vacationsAvailable: 15,
      startDate: new Date(2016, 9, 15, 7, 46, 36, 500),
      workStatus: WorkStatus.active,
      team: 'Angular',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
    },
    {
      id: 4,
      name: 'Anastasia',
      surname: 'Kristensen',
      birthday: new Date(1995, 11, 26, 11, 57, 36, 500),
      workEmail: 'abc@asdasd.com',
      email: 'dsfsf@sfdg.com',
      phone: '0931234567',
      skype: 'qwerty',
      vacationsAvailable: 15,
      startDate: new Date(2016, 9, 15, 7, 46, 36, 500),
      workStatus: WorkStatus.active,
      team: 'Angular',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y'
    }
  ]

  load() {
    return JSON.parse(JSON.stringify(this.users)); // Emulate immutable data
  }

  addUser(newUser: User) {
    this.users.push(newUser)
  }

  findCertainUser(id: number) {
    return this.users.find(user => user.id === id)
  }
  userLength = this.users.length;

  addUserLocal(user: User) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('vacationRequests', JSON.stringify([]));
    }
    this.localUsers = JSON.parse(localStorage.getItem('vacationRequests'));
    this.localUsers.push(user);
    localStorage.setItem('vacationRequests', JSON.stringify(this.localUsers));
  }

  getUsers() {
    // return JSON.parse(localStorage.getItem('vacationRequests'));
    return this.users;
  }

}


