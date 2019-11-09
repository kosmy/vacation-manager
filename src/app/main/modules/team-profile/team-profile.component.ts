import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { TeamAPIService } from '../shared/services/team-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacationRequestListComponent } from '../vacation-request-list/vacation-request-list.component';
import { Team } from '../shared/models/team';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamProfileComponent implements OnInit {

  team: Team;
  constructor(
    private teamAPIService: TeamAPIService,
    private dialogRef: MatDialogRef<VacationRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Team
  ) { }

  ngOnInit() {
    this.team = this.data;
    console.log(this.team)
  }

}
