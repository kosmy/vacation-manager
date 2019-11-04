import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../main/modules/shared/models/employee';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  logInForm: FormGroup;
  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(logInForm: FormGroup) {
    const email = logInForm.value.email;

    this.authService.singIn(logInForm.value).pipe(
      flatMap(() =>
        this.authService.getUserByEmail(email)
      )
    ).subscribe((employee) => {
      localStorage.setItem('currentUserId', employee.id)
      this.router.navigate(['main/profile', employee.id]);
    })

    this.logInForm.reset();
    this.logInForm.markAsUntouched();
    Object.keys(this.logInForm.controls).forEach(name => {
      let control = this.logInForm.controls[name];
      control.setErrors(null);
    });

  }

}
