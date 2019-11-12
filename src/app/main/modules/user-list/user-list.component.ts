import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserAPIService } from '../shared/services/user-api.service';
import { UserInfoComponent } from '../profile/components/user-info/user-info.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private paginator: MatPaginator;
  isLoaded: boolean = false;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'workEmail', 'vacationsAvailable', 'action'];
  users: Employee[];
  dataSource: MatTableDataSource<Employee[]>;
  filteredUsers: Employee[];
  filteredByStatus: Employee[];
  selected: boolean = true;
  getUsersSubscription: Subscription;

  constructor(private dialog: MatDialog, private userAPIService: UserAPIService) { }

  ngOnInit() {
    this.getUsersSubscription =  this.userAPIService.getAllUsers().subscribe((users: Employee[]) => {
      this.users = users;
      this.filteredByStatus = users;
      this.assignCopy();
      this.dataSource = new MatTableDataSource<any>(this.filteredUsers)
      this.isLoaded = true;
    });
  }
  ngOnDestroy(): void {
    this.getUsersSubscription.unsubscribe();
  }

  editUser(user: Employee): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: 'fit-content',
      data: user
    });
  }

  assignCopy() {
    this.filteredUsers = this.users;
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredUsers = Object.assign([], this.filteredByStatus) 
      .filter((user: Employee) => {
        if (user.firstName && user.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return user.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        else if (user.surname && user.surname.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return user.surname.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        else if (user.workEmail && user.workEmail.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return user.workEmail.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        else if (user.phone && user.phone.indexOf(value) > -1) {
          return user.phone.indexOf(value) > -1
        }
      })

    // .filter(item => (this.filterStatus !== undefined) ? item.isActive === this.filterStatus : item);

    this.dataSource = new MatTableDataSource<any>(this.filteredUsers)
  }

  filterStatus(value: Employee['isActive']) {
    this.filteredByStatus = Object.assign([], this.users).filter((user: Employee) => user.isActive === value);
    this.dataSource = new MatTableDataSource<any>(this.filteredByStatus)
  }

  showProfile(user: Employee) {
    this.dialog.open(UserInfoComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: user
    });
  }
}
