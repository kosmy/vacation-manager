import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../modules/shared/models/user';
import { UserDataService } from '../../modules/shared/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  certainUserId: number;

  
  constructor(private userDataService: UserDataService, private router: Router) { }

  ngOnInit() {
    this.certainUserId = this.userDataService.getUserId()
    console.log(this.certainUserId)
  }

  toProfile() {
    this.certainUserId = this.userDataService.getUserId()
    this.router.navigate(["/main/profile", this.certainUserId])
  }
  toVacationRequest() {
    this.certainUserId = this.userDataService.getUserId()
    this.router.navigate(["/main/vacation-request", this.certainUserId])
  }
  

}
