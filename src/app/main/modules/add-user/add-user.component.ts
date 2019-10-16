import { Component, OnInit } from '@angular/core';
import { WorkStatus, User } from '../shared/models/user';
import { UserDataService } from '../shared/services/user-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  constructor(private userDataService: UserDataService,
    private teamDataService: TeamDataService) { }

  ngOnInit() {
    this.buildForm();
    this.teams = this.teamDataService.getTeams();
    this.fillUserInputs();
  }

  buildForm() {
    this.addUserForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      workEmail: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      skype: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      workStatus: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
    })
  }

  fillUserInputs() {
    this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.addUserForm.patchValue(this.user);
  }


  onSubmit(addUserForm: FormGroup) {
    this.user.id = this.userDataService.getUsersLength() + 1
    this.user.login = addUserForm.value.login
    this.user.password = addUserForm.value.password
    this.user.name = addUserForm.value.name;
    this.user.surname = addUserForm.value.surname;
    this.user.birthday = addUserForm.value.birthday;
    this.user.workEmail = addUserForm.value.workEmail;
    this.user.email = addUserForm.value.email;
    this.user.phone = addUserForm.value.phone;
    this.user.skype = addUserForm.value.skype;
    this.user.balance = addUserForm.value.balance;
    this.user.startDate = addUserForm.value.startDate;
    this.user.workStatus = WorkStatus.active;
    this.user.team = addUserForm.value.team;

    this.userDataService.addUser(this.user);
  }
}
