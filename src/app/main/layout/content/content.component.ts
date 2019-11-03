import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../modules/shared/models/employee';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() certainUser: Employee;
  constructor() { }

  ngOnInit() {
  }

}
