import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/log-in/services/authorization.service';
import { Employee } from '../../modules/shared/models/employee';
import { VacationAPIService } from '../../modules/shared/services/vacation-api.service';
import { Observable } from 'rxjs';
import { Vacation } from '../../modules/shared/models/vacation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit {

  isShown:boolean = false;
  requestCount$: Observable<number>;
  constructor(
    private authService: AuthorizationService,
    private vacationAPIService: VacationAPIService,
  ) { }

  ngOnInit() {
    this.vacLength();
    
    this.requestCount$ = this.vacationAPIService.vacationCount
  }

  vacLength() {
    return this.vacationAPIService.changeVacationLength()
  } 
}
