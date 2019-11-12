import { Component, OnInit, ViewChild, ElementRef, Optional, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';
import { Observable, Subscription, Subscribable } from 'rxjs';
import { Employee } from '../shared/models/employee';
import { UserAPIService } from '../shared/services/user-api.service';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditTeamComponent implements OnInit, OnDestroy {



  @ViewChild('memberInput', { static: false }) memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('memberAuto', { static: false }) matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  addTeamForm: FormGroup;
  team: Team;
  users: Employee[];
  members: Employee[] = [];
  allMembers: Employee[];
  filteredUsers: Observable<Employee[]>;
  filteredMembers: Observable<Employee[]>

  editTeamSubscription: Subscription;
  addTeamSubscription: Subscription;
  getAllUsersSubscription: Subscription;
  getUserByIdSubscription: Subscription;

  btnName: string;
  titleName: string;

  isLoaded: boolean = false;

  constructor(
    private teamAPIService: TeamAPIService,
    private userAPIService: UserAPIService,
    @Optional() public dialogRef: MatDialogRef<AddEditTeamComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Team
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.fillInputs();
    this.getAllUsersSubscription = this.userAPIService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.allMembers = users;
      this.filteredUsers = this.addTeamForm.controls['teamLead'].valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.users.slice())
        );
      this.initFilteredMembers();
    });
  }

  ngOnDestroy(): void {
    this.getAllUsersSubscription.unsubscribe();
    if (this.addTeamSubscription) {
      this.addTeamSubscription.unsubscribe();
    }
    else if (this.editTeamSubscription) {
      this.editTeamSubscription.unsubscribe();
    }
    else if (this.getUserByIdSubscription) {
      this.getUserByIdSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.addTeamForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      teamLead: new FormControl('', [Validators.required]),
      teamMembers: new FormControl(),
    })
  }


  fillInputs() {
    if (this.data) {
      console.log(this.data)
      this.team = this.data;
      this.getUserByIdSubscription = this.userAPIService.getUserById(this.data.teamLeadId).subscribe((user) => {
        this.addTeamForm.patchValue(this.data);
        this.addTeamForm.controls['teamLead'].setValue(user)
        this.members = this.data.employees;
        console.log(this.team)
        this.isLoaded = true;
      })
      this.btnName = "Save";
      this.titleName = "Edit Team"
    }
    else {
      this.team = new Team(null,null,null,null,null,null,null)
      this.btnName = "Save";
      this.titleName = "Add Team"
      this.isLoaded = true;

    }
  }

  initFilteredMembers() {
    this.filteredMembers = this.addTeamForm.controls['teamMembers'].valueChanges.pipe(
      startWith(null),
      map((name: string | null) => name ? this._filterMembers(name) : this.allMembers.slice()));
  }

  // Team Lead Filter
  displayFn(user?: Employee): string | undefined {
    return user ? `${user.firstName} ${user.surname}` : undefined;
  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();
    return this.users.filter((user) => {
      if (user.firstName) {
        return user.firstName.toLowerCase().indexOf(filterValue) === 0
      }
    });
  }

  // Team Members Chips Methods
  add(event: MatChipInputEvent): void {
    // Add user only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.addTeamForm.controls['teamMembers'].setValue(null);
    }
  }

  remove(member: Employee): void {
    const index = this.members.indexOf(member);

    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const memberObject = this.allMembers.find((member) => member.id === event.option.value);
    this.members.push(memberObject);
    this.memberInput.nativeElement.value = '';
    this.addTeamForm.controls['teamMembers'].setValue(null);
  }

  private _filterMembers(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.allMembers
      .filter((member) => {
        if (member.firstName) {
          return member.firstName.toLowerCase().indexOf(filterValue) === 0;
        }
      })
  }
  ///////////////////////////////////


  clearFormInputs() {
    this.addTeamForm.reset();
    this.addTeamForm.markAsUntouched();
    Object.keys(this.addTeamForm.controls).forEach(name => {
      let control = this.addTeamForm.controls[name];
      control.setErrors(null);
    });
  }

  onSubmit() {
    this.team.name = this.addTeamForm.value.name;
    this.team.teamLeadName = `${this.addTeamForm.value.teamLead.firstName} ${this.addTeamForm.value.teamLead.surname}`;
    this.team.teamLeadId = this.addTeamForm.value.teamLead.id;
    this.team.deleted = false;
    this.team.employeeCount = this.members.length;
    console.log(this.members)
    this.team.employees = this.members;

    if (this.data) {
      this.editTeamSubscription = this.teamAPIService.editTeam(this.team).subscribe();
      this.dialogRef.close();
    }
    else {
      this.addTeamSubscription = this.teamAPIService.addTeam(this.team).subscribe();
    }
    this.team = new Team(null, null, null, null, null, null, null);
    this.clearFormInputs();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
