import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { UserDataService } from '../main/modules/shared/services/user-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../main/modules/shared/models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  logInForm: FormGroup;
  users: User[]

  constructor(private router: Router, private authService: AuthorizationService, private userDataService: UserDataService) { }

  whatUserId(login, password): number {
    return this.users.find( user => user.login === login && user.password === password).id;
  }
  ngOnInit() {
    this.buildForm();
    this.users = this.userDataService.getUsers();
  }

  buildForm() {
    this.logInForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  onSubmit(logInForm: FormGroup) {
    this.userDataService.rememberUserId(this.whatUserId(logInForm.value.login, logInForm.value.password))
    this.router.navigate(['main/profile', this.whatUserId(logInForm.value.login, logInForm.value.password)])
  }
}
