import { Component, OnInit, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { WorkStatus, User } from '../shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserAPIService } from '../shared/services/user-api.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddEditUserComponent implements OnInit {

  statuses = [{ value: WorkStatus.active, text: "Active" }, { value: WorkStatus.fired, text: "Fired" }];
  addUserForm: FormGroup;
  user: User;
  isModal: boolean = false;
  teams: Team[];
  allUsers: User[];
  btnName: string;
  titleName: string;

  // constructor(private userDataService: UserDataService,
  //   private teamDataService: TeamDataService, public dialogRef: MatDialogRef<AddUserComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: User) { }

  constructor(
    private teamAPIService: TeamAPIService,
    private userApiService: UserAPIService,
    @Optional() public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.buildForm();
    this.teamAPIService.getAllTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
    this.fillUserInputs();

    this.userApiService.getAllUsers().subscribe(data => this.allUsers = data)
    console.log(this.allUsers);
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

  // fillUserInputs() {
  //   this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  //   this.addUserForm.patchValue(this.user);
  // }
  fillUserInputs() {
    if (this.data) {
      this.isModal = true;
      this.user = this.data;
      this.addUserForm.patchValue(this.user);
      this.btnName = "Edit User";
      this.titleName = "Edit Profile"
    }
    else {
      this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
      this.addUserForm.patchValue(this.user);
      this.btnName = "Add User";
      this.titleName = "Add Employee"
    }
  }

  onSubmit(addUserForm: FormGroup) {
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

    if (this.data) {
      this.userApiService.editUser(this.user).subscribe();
    }
    else {
      this.userApiService.addUser(this.user).subscribe();
    }
    this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.addUserForm.reset();
    this.addUserForm.markAsUntouched();
    Object.keys(this.addUserForm.controls).forEach(name => {
      let control = this.addUserForm.controls[name];
      control.setErrors(null);
    });
  }
}
