import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../../../shared/services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() certainUser: User

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    
  }

  

}
