import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './modules/shared/models/employee';
import { AuthorizationService } from '../log-in/services/authorization.service';
import { UserAPIService } from './modules/shared/services/user-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  isShown: boolean = false;
  currentUser: Employee;
  isLoaded: boolean = false;
  subscription: Subscription;
  constructor(private userAPIService: UserAPIService, private authService: AuthorizationService) { }

  ngOnInit() {
    this.subscription = this.userAPIService.getUserById(this.authService.currentUserId).subscribe((user) => {
      this.currentUser = user;
      if (this.authService.tokenData.role === "Administrator") {
        this.isShown = true;
      }
      this.isLoaded = true;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
