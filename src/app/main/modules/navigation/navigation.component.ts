import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/log-in/services/authorization.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  certainUserId: Employee['id'];
  
  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    // console.log("CERTAIN USER",this.authService.certainUserId)
    // this.certainUserId = this.authService.certainUserId;
    this.certainUserId = localStorage.getItem('currentUserId')
  }
}
