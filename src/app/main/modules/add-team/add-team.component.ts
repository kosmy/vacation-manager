import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamDataService } from '../shared/services/team-data.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  addTeamForm: FormGroup;
  team: Team;
  usersLength: number;
  
  constructor(private teamDataService: TeamDataService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addTeamForm = new FormGroup({
      teamName: new FormControl('', [Validators.required]),
      teamLeadName: new FormControl('', [Validators.required]),
      teamMembers: new FormControl()
    })
  }
  onSubmit(addTeamForm: FormGroup) {
    this.team = new Team(
      addTeamForm.value.teamName,
      addTeamForm.value.teamLeadName
    );
    this.teamDataService.addTeam(this.team);
  }
}
