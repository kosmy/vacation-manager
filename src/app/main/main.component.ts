import { Component, OnInit } from '@angular/core';
import { Employee } from './modules/shared/models/employee';
import { AuthorizationService } from '../log-in/services/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.getUserId('yo').subscribe( users => console.log(users))
  }

}
