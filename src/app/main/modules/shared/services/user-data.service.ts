import { Injectable } from '@angular/core';
import { WorkStatus, User } from '../models/user';

@Injectable()
export class UserDataService {

  public userId: number = 0;
  private employees: User[] = [
    {
      id: 1,
      login: 'nikita',
      password: 'nikita',
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
      login: 'andrey',
      password: 'andrey',
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
      login: 'denis',
      password: 'denis',
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
      login: 'anastasia',
      password: 'anastasia',
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

  getUsersLength(): number {
    return this.getUsers().length;
  }

  findCertainUser(login: string, password: string): User {
    return this.employees.find(user => user.login === login && user.password === password)
  }
  addUser(user: User) {
    this.checkIfEmptyAndFill()
    this.getUsers()
    this.employees.push(user);
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  getUsers(): User[] {
    this.checkIfEmptyAndFill();
    return JSON.parse(localStorage.getItem('employees'));
  }
  checkIfEmptyAndFill() {
    if (!localStorage.getItem('employees')) {
      localStorage.setItem('employees', JSON.stringify(this.employees));
    }
  }

  findUserById(id: number): User {
    return this.employees.find(user => user.id === id)
  }

  rememberUserId(userId: number) {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', JSON.stringify(this.userId));
    }
    this.userId = userId;
    localStorage.setItem('userId', JSON.stringify(this.userId));
  }
  getUserId(): number {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', JSON.stringify(this.userId));
    }
    return JSON.parse(localStorage.getItem('userId'));
  }
}


