import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TeamAPIService {

  constructor(private http: HttpClient) { };

  private teamApiUrl = 'http://localhost:3000/teams/';
  private teams: Team[] = [];

  // addTeam(team: Team) { 
  //   if (!localStorage.getItem('teams')) {
  //     localStorage.setItem('teams', JSON.stringify([]));
  //   }
  //   JSON.parse(localStorage.getItem('teams'));
  //   this.teams.push(team);
  //   localStorage.setItem('teams', JSON.stringify(this.teams));
  // }
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamApiUrl, team);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamApiUrl)
  }

  // getTeams(): Team[] {
  //   return JSON.parse(localStorage.getItem('teams'));
  // }
}
