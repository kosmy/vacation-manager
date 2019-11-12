import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamAPIService } from '../shared/services/team-api.service';
import { Team } from '../shared/models/team';
import { MatTableDataSource } from '@angular/material/table';
import { TeamProfileComponent } from '../team-profile/team-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTeamComponent } from '../add-edit-team/add-edit-team.component';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }


  dataSource;
  teams: Team[];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['name', 'teamLead', 'action'];
  teamSubscription: Subscription;



  constructor(private dialog: MatDialog,
    private teamAPIService: TeamAPIService) { }

  ngOnInit() {
    this.getTeams();
  }
  ngOnDestroy(): void {
    this.teamSubscription.unsubscribe();
  }

  getTeams() {
    this.teamSubscription = this.teamAPIService.getAllTeams().subscribe((teams) => {
      this.dataSource = new MatTableDataSource<any>(teams)
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    });
  }
  showProfile(team: Team) {
    this.dialog.open(TeamProfileComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: team
    });
  }

  editTeam(team: Team) {
    this.dialog.open(AddEditTeamComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: team
    });
  }
}
