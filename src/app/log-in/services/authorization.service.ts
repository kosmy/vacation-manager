import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  constructor() { }

  isEmployee: boolean = false;
  isTeamLead: boolean = false;
  isAdmin: boolean = false;


  checkLogIn(login: string, password: string) {
    if (login === 'nikita' && password === 'nikita') {
      this.isEmployee = true;
    }
    else if (login === 'teamlead' && password === 'teamlead') {
      this.isTeamLead = true
    }
    else if(login === 'admin' && password === 'admin') {
      this.isAdmin = true
    }
  }

  isNavShowed() {
    if (this.isAdmin === true || this.isTeamLead === true) {
      return true
    }
    else {
      return false
    }
  }
}
