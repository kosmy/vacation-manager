import { Component, OnInit, Inject, Optional, ViewEncapsulation, AfterContentInit, AfterViewInit } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserAPIService } from '../shared/services/user-api.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditUserComponent implements OnInit, AfterContentInit, AfterViewInit {

  private addUserForm: FormGroup;
  private user: Employee;
  isModal: boolean = false;
  statuses: string[] = ['Active', 'Fired']
  allUsers: Employee[];
  btnName: string;
  titleName: string;
  teams: Team[];
  isLoaded: boolean = false;

  constructor(
    private teamApiService: TeamAPIService,
    private userApiService: UserAPIService,
    @Optional() public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  ngOnInit() {
    this.teamApiService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
      this.buildForm();
      this.fillUserInputs();
      this.isLoaded = true;
    });
  }
  ngAfterViewInit(): void {
  }
  ngAfterContentInit() {
  }
  buildForm() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      jobTitle: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      workEmail: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      skype: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      workStartDate: new FormControl('', [Validators.required]),
      workStatus: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
    })
  }

  changeStatus() {
    if (this.addUserForm.value.workStatus === 'Active') {
      console.log('Active')
      this.user.isActive = true;
      this.user.deleted = false;
    }
    else {
      console.log('Fired')
      this.user.isActive = true;
      this.user.deleted = false;
    }
  }
 
  fillUserInputs() {
    if (this.data) {
      this.isModal = true;
      this.user = this.data;
      console.log("USER BEFORE PATCH VALUE", this.user);
      this.addUserForm.patchValue(this.user);
      this.btnName = "Edit User";
      this.titleName = "Edit Profile"
    }
    else {
      this.user = new Employee(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
      this.addUserForm.patchValue(this.user);
      this.btnName = "Add User";
      this.titleName = "Add Employee"
    }
  }

  clearFormInputs() {
    this.addUserForm.reset();
    this.addUserForm.markAsUntouched();
    Object.keys(this.addUserForm.controls).forEach(name => {
      let control = this.addUserForm.controls[name];
      control.setErrors(null);
    });
  }
  onSubmit(addUserForm: FormGroup) {
    this.user.firstName = addUserForm.value.firstName;
    this.user.surname = addUserForm.value.surname;
    this.user.jobTitle = addUserForm.value.jobTitle;
    this.user.birthdate = addUserForm.value.birthdate;
    this.user.workEmail = addUserForm.value.workEmail;
    this.user.email = addUserForm.value.email;
    this.user.phone = addUserForm.value.phone;
    this.user.skype = addUserForm.value.skype;
    this.user.balance = addUserForm.value.balance;
    this.user.workStartDate = addUserForm.value.startDate;
    this.user.teamId = addUserForm.value.team;
    this.user.teams.push(this.teams.find(team => team.id === addUserForm.value.team));

    if (this.data) {
      forkJoin(
        this.userApiService.editUser(this.user),
        this.teamApiService.addUserToTeam(this.user.teamId, this.data.id)
      ).subscribe();
    }
    else {
      this.userApiService.addUser(this.user).subscribe();
    }
    this.user = new Employee(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.clearFormInputs();
  }
}
