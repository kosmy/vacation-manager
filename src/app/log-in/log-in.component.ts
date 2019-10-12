import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(private router: Router, private authService: AuthorizationService) { }

  login: string;
  password: string;

  enter() {
    this.authService.checkLogIn(this.login, this.password);
    if (this.authService.isEmployee === true) {
      this.router.navigate(['/main'])
    }
    else {
      console.log("error")
    }
  }

}
