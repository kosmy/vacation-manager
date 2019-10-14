import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../modules/shared/models/user';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() certainUser: User;
  constructor() { }

  ngOnInit() {
  }

}
