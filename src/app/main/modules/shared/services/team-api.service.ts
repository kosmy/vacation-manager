import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamAPIService {

  constructor(private http: HttpClient) { }

  private teamApiUrl = 'https://vacations.polytech.rocks:52540/api/Team/';

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamApiUrl, team);
  }

  editTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(this.teamApiUrl, team);
  }

  getTeam(teamId: Team['id']): Observable<Team> {
    return this.http.get<Team>(this.teamApiUrl + teamId);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamApiUrl);
  }

  addUserToTeam(teamId: Team['id'], userId: Employee['id']): Observable<Employee['id']> {
    return this.http.post<Employee['id']>(this.teamApiUrl + teamId + '/user/' + userId + '/add', userId);
  }

  removeUserFromTeam(teamId: Team['id'], userId: Employee['id']): Observable<Employee['id']> {
    return this.http.post<Employee['id']>(this.teamApiUrl + teamId + '/user/' + userId + '/remove', userId);
  }

}
