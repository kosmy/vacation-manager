import { Component, OnInit } from '@angular/core';
import { WorkStatus, User } from '../shared/models/user';
import { UserDataService } from '../shared/services/user-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamDataService } from '../shared/services/team-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  statuses = [{ value: WorkStatus.active, text: "Active" }, { value: WorkStatus.fired, text: "Fired" }];
  addUserForm: FormGroup;
  user: User;
  teams: Team[];
  constructor(private userDataService: UserDataService, private teamDataService: TeamDataService) { }

  ngOnInit() {
    this.buildForm();
    this.teams = this.teamDataService.getTeams();
  }

  buildForm() {
    this.addUserForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      birthday: new FormControl(),
      workEmail: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      skype: new FormControl(),
      vacationsAvailable: new FormControl(),
      startDate: new FormControl(),
      workStatus: new FormControl(),
      team: new FormControl(),
    })
  }
  onSubmit(addUserForm: FormGroup) {
    this.user = new User(this.userDataService.getUsersLength() + 1,
      addUserForm.value.login,
      addUserForm.value.password,
      addUserForm.value.name,
      addUserForm.value.surname,
      addUserForm.value.birthday,
      addUserForm.value.workEmail,
      addUserForm.value.email,
      addUserForm.value.phone,
      addUserForm.value.skype,
      addUserForm.value.vacationsAvailable,
      addUserForm.value.startDate,
      WorkStatus.active,
      addUserForm.value.team);


    this.userDataService.addUser(this.user);
    console.log(this.user)
    console.log(this.userDataService.getUsers())
  }
}
