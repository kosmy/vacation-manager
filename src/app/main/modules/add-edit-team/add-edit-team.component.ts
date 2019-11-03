import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss']
})
export class AddEditTeamComponent implements OnInit {

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
    // this.team = new Team(
    //   addTeamForm.value.teamName,
    //   addTeamForm.value.teamLeadName
    // );
    this.teamAPIService.addTeam(this.team).subscribe();
  }
}
