import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { UserDataService } from '../main/modules/shared/services/user-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  logInForm: FormGroup;

  constructor(private router: Router, private authService: AuthorizationService, private userDataService: UserDataService) { }

  whatUserId(login, password): number {
    return this.userDataService.findCertainUser(login, password).id;
  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.logInForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
    })
  }
  onSubmit(logInForm: FormGroup) {
    this.userDataService.rememberUserId(this.whatUserId(logInForm.value.login, logInForm.value.password))
    this.router.navigate(['main/profile', this.whatUserId(logInForm.value.login, logInForm.value.password)])
  }
}
