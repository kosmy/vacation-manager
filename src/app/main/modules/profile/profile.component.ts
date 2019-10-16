import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: User[];
  certainUserId: number
  certainUser: User;
  constructor(private activatedRoute: ActivatedRoute, private userDataService: UserDataService) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe((params)=> {
    //   this.certainUser = this.userDataService.findUserById(+params['id']);
    //   console.log(this.certainUser)
    // })
    this.certainUserId = this.userDataService.getUserId()
    this.users = this.userDataService.getUsers();
    this.certainUser = this.users.find(user => user.id === this.certainUserId)

  }  

}
