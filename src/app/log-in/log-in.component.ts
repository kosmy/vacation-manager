import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../main/modules/shared/models/employee';
import { forkJoin, Subscribable, Subscription } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  logInForm: FormGroup;
  forgotPassword: boolean = false;
  isSent: boolean = false;
  forgotPasswordSubscription: Subscription;

  sendEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {

    this.buildForm();
  }

  buildForm() {
    this.logInForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl('', [Validators.required])
    })

  }

  onSubmit(logInForm: FormGroup) {

    this.authService.singIn(logInForm.value).subscribe(() => {
      this.router.navigate(['main/profile', this.authService.currentUserId]);
    })

    this.logInForm.reset();
    this.logInForm.markAsUntouched();
    Object.keys(this.logInForm.controls).forEach(name => {
      let control = this.logInForm.controls[name];
      control.setErrors(null);
    });

  }

  sendPassword(inputEmail) {
    if (inputEmail) {
      console.log(inputEmail)
      const request = {
        email: inputEmail,
        date: new Date()
      }
      this.forgotPasswordSubscription = this.authService.forgotPassword(request).subscribe(() => {
        this.isSent = true;
        setTimeout(() => {
          this.forgotPassword = false;
          this.isSent = false;
        }, 2000);
      })
    }
  }
}
