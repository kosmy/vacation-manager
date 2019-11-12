import { Component, OnInit, Inject, Optional, ViewEncapsulation, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserAPIService } from '../shared/services/user-api.service';
import { forkJoin, Subscription } from 'rxjs';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AddEditUserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  user: Employee;
  statuses: string[] = ['Active', 'Fired']
  allUsers: Employee[];
  btnName: string;
  titleName: string;
  avatarPreview: string;
  teams: Team[];
  isLoaded: boolean = false;

  selectedFile: ImageSnippet;


  getTeamsSubscription: Subscription;
  addUserSubscription: Subscription;
  editUserSubscription: Subscription;

  constructor(
    private teamApiService: TeamAPIService,
    private userApiService: UserAPIService,
    @Optional() public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }
  ngOnInit(): void {
    this.getTeamsSubscription = this.teamApiService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
      this.buildForm();
      this.fillInputs();
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.getTeamsSubscription.unsubscribe();
    if (this.addUserSubscription) {
      this.addUserSubscription.unsubscribe();
    }
    else if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }
  }



  buildForm() {
    this.addUserForm = new FormGroup({
      avatar: new FormControl,
      firstName: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[A-Za-z]*'),
          Validators.minLength(2),
          Validators.maxLength(15)
        ]),
      surname: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[A-Za-z]*'),
          Validators.minLength(2),
          Validators.maxLength(15)
        ]),
      jobTitle: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[A-Za-z]*'),
          Validators.minLength(2),
          Validators.maxLength(15)
        ]),
      birthdate: new FormControl('', [Validators.required]),
      workEmail: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      phone: new FormControl('', [Validators.required]),
      skype: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      workStartDate: new FormControl(''),
      workEndDate: new FormControl(''),
      workStatus: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
    })
  }

  changeStatus() {
    if (this.addUserForm.value.workStatus === 'Active' && !this.data) {
      this.user.isActive = true;
      this.user.workStartDate = new Date();
      this.user.workEndDate = null;

    }
    else if (this.addUserForm.value.workStatus === 'Active' && this.data) {
      this.user.isActive = true;
      this.user.workEndDate = null;

    }
    else if (this.addUserForm.value.workStatus === 'Fired' && !this.data) {
      this.user.isActive = false;
      this.user.workStartDate = null;
      this.user.workEndDate = new Date();
    }
    else {
      this.user.isActive = false;
      this.user.workStartDate = null;
    }
  }

  setStatus() {
    if (this.data.isActive === true) {
      this.addUserForm.controls['workStatus'].setValue("Active")
      console.log(this.addUserForm.controls['workStatus'].value)
    }
    else {
      this.addUserForm.controls['workStatus'].setValue("Fired")
      console.log(this.addUserForm.controls['workStatus'].value)
    }
  }
  setTeam() {
    this.addUserForm.controls['team'].setValue(this.data.teamId);
  }

  fillInputs() {
    if (this.data) {
      this.user = this.data;
      console.log("USER BEFORE PATCH VALUE", this.user);
      this.addUserForm.patchValue(this.user);
      this.setStatus();
      this.setTeam();
      this.btnName = "Edit User";
      this.titleName = "Edit Profile"
    }
    else {
      this.user = new Employee(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.user.firstName = this.addUserForm.value.firstName;
    this.user.surname = this.addUserForm.value.surname;
    this.user.jobTitle = this.addUserForm.value.jobTitle;
    this.user.birthdate = this.addUserForm.value.birthdate;
    this.user.workEmail = this.addUserForm.value.workEmail;
    this.user.email = this.addUserForm.value.email;
    this.user.phone = this.addUserForm.value.phone;
    this.user.skype = this.addUserForm.value.skype;
    this.user.deleted = false;
    this.user.balance = this.addUserForm.value.balance;
    this.user.workStartDate = this.addUserForm.value.startDate;
    this.user.teamId = this.addUserForm.value.team;

    if (this.data) {
      this.editUserSubscription = this.userApiService.editUser(this.user).subscribe();
    }
    else {
      this.addUserSubscription = this.userApiService.addUser(this.user).subscribe();
    }
    this.user = new Employee(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.clearFormInputs();
    this.dialogRef.close();
  }
}
