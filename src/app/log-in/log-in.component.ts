import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { UserDataService } from '../main/modules/shared/services/user-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(private router: Router, private authService: AuthorizationService, private userDataService: UserDataService) { }

  login: string;
  password: string;
  id: number;

  enter() {
    this.authService.checkLogIn(this.login, this.password);
    if (this.authService.isEmployee === true) {
      this.router.navigate(['/main/profile'])
    }
    else {
      console.log("error")
    }
  }

  whatUserId() {
    // this.userDataService.getUsers().find()
  }

}
