import { Component, OnInit } from '@angular/core';
import { TeamAPIService } from '../shared/services/team-api.service';
import { Team } from '../shared/models/team';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  dataSource;
  teams: Team[];
  isLoaded: boolean = false;
  displayedColumns: string[] = ['name', 'teamLead', 'action'];



  constructor(private teamAPIService: TeamAPIService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teamAPIService.getAllTeams().subscribe((teams) => {
      this.dataSource = new MatTableDataSource<any>(teams)
      console.log(teams)
      this.isLoaded = true;
    });
  }
}
