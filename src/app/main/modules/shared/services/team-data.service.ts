import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable()
export class TeamDataService {

  private teams: Team[] = [];

  addTeam(team: Team) { 
    if (!localStorage.getItem('teams')) {
      localStorage.setItem('teams', JSON.stringify([]));
    }
    JSON.parse(localStorage.getItem('teams'));
    this.teams.push(team);
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }

  getTeams(): Team[] {
    return JSON.parse(localStorage.getItem('teams'));
  }
}
