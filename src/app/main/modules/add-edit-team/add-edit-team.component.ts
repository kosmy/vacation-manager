import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../shared/models/team';
import { TeamAPIService } from '../shared/services/team-api.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Employee } from '../shared/models/employee';
import { UserAPIService } from '../shared/services/user-api.service';
import { takeUntil, take } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss']
})

export class AddEditTeamComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  // @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  addTeamForm: FormGroup;
  team: Team;
  users: Employee[];
  filteredUsers: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>(1);
  filteredUsersMulti: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(private teamAPIService: TeamAPIService, private userAPIService: UserAPIService) { }

  ngOnInit() {
    this.buildForm();
    this.userAPIService.getAllUsers().subscribe((users) => {
      this.users = users;

      this.filteredUsers.next(this.users.slice());
      this.filteredUsersMulti.next(this.users.slice());

      this.addTeamForm.controls['teamLeadFilter'].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterUsers();
        });

      this.addTeamForm.controls['teamMembersFilter'].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterUsersMulti();
        });
    });
  }

  buildForm() {
    this.addTeamForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      teamLead: new FormControl('', [Validators.required]),
      teamLeadFilter: new FormControl(),
      teamMembers: new FormControl(),
      teamMembersFilter: new FormControl()
    })
  }
  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // protected setInitialValue() {
  //   this.filteredUsers
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Employee, b: Employee) => a && b && a.id === b.id;
  //     });
  // }

  protected filterUsersMulti() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.addTeamForm.controls['teamMembersFilter'].value;
    if (!search) {
      this.filteredUsersMulti.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the users

    this.filteredUsersMulti.next(
      this.users.filter((user) => {
        if (user.firstName !== null && user.firstName.toLowerCase().indexOf(search) > -1) {
          return user.firstName.toLowerCase().indexOf(search) > -1
        }
      })
    );
  }

  protected filterUsers() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.addTeamForm.controls['teamLeadFilter'].value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the users
    this.filteredUsers.next(
      this.users.filter((user) => {
        if (user.firstName !== null && user.firstName.toLowerCase().indexOf(search) > -1) {
          return user.firstName.toLowerCase().indexOf(search) > -1
        }
      })
    );
  }

  clearFormInputs() {
    this.addTeamForm.reset();
    this.addTeamForm.markAsUntouched();
    Object.keys(this.addTeamForm.controls).forEach(name => {
      let control = this.addTeamForm.controls[name];
      control.setErrors(null);
    });
  }

  onSubmit(addTeamForm: FormGroup) {
    this.team = new Team(
      this.addTeamForm.value.name,
      `${this.addTeamForm.value.teamLead.firstName} ${this.addTeamForm.value.teamLead.surname}`,
      this.addTeamForm.value.teamLead.id,
      false,
      this.addTeamForm.value.teamMembers.length,
      this.addTeamForm.value.teamMembers
    );
    console.log(this.team);
    this.teamAPIService.addTeam(this.team).subscribe(() => {
      this.team = new Team(null, null, null, null, null, null, null);
      this.clearFormInputs();
    });
  }
}
