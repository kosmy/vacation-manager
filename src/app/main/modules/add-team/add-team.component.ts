import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  addTeamForm: FormGroup;
  team: Team;
  usersLength: number;
  
  constructor(private teamAPIService: TeamAPIService) { }

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
    this.teamAPIService.addTeam(this.team).subscribe();
  }
}
