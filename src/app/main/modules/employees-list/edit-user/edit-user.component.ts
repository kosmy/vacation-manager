import { Component, OnInit, Inject } from '@angular/core';
import { WorkStatus, User } from '../../shared/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Team } from '../../shared/models/team';
import { UserDataService } from '../../shared/services/user-data.service';
import { TeamDataService } from '../../shared/services/team-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  statuses = [{ value: WorkStatus.active, text: "Active" }, { value: WorkStatus.fired, text: "Fired" }];
  addUserForm: FormGroup;
  user: User;
  teams: Team[];
  constructor(private userDataService: UserDataService,
    private teamDataService: TeamDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.buildForm();
    this.teams = this.teamDataService.getTeams();
    console.log(this.teams)
    this.fillUserInputs();
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
      balance: new FormControl(),
      startDate: new FormControl(),
      workStatus: new FormControl(),
      team: new FormControl(),
    })
  }

  fillUserInputs() {
    console.log(this.data)
    if (this.data) {
      this.user = this.data;
      this.addUserForm.patchValue(this.user);
    }
    else {
      this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
      this.addUserForm.patchValue(this.user);
    }
  }


  editUser(addUserForm: FormGroup) {
    this.user.id = this.data.id;
    this.user.login = addUserForm.value.login;
    this.user.password = addUserForm.value.password;
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

    this.userDataService.editUser(this.user);
    this.dialogRef.close();
  }
}
