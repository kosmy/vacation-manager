import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../modules/shared/models/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  certainUserId: Employee['id'];
  
  constructor() { }

  ngOnInit() {
    this.certainUserId = localStorage.getItem('currentUserId')
  }
}
