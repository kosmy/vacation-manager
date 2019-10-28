import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../../../shared/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserAPIService } from '../../../shared/services/user-api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  // @Input() certainUser: User;
  certainUser: User;
  allUsers: User[];
  isLoaded: boolean = false;

  constructor(private userDataService: UserDataService, private userApiService: UserAPIService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params["id"];
      this.userApiService.getUserById(6).subscribe((user) => {
        this.certainUser = user;
        this.isLoaded = true
      });
    })
  }



}
