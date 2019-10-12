import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  certainUser: User
  constructor(private userDataService: UserDataService) {
    this.certainUser = this.userDataService.findCertainUser(1);
  }

  ngOnInit() {
  }

}
