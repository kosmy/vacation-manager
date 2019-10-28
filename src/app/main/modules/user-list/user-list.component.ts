import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserAPIService } from '../shared/services/user-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'workEmail', 'vacationsAvailable', 'action'];
  users: User[];
  dataSource;
  filteredUsers: User[];

  constructor(private dialog: MatDialog, private userAPIService: UserAPIService) { }

  ngOnInit() {
    this.userAPIService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.assignCopy();
      this.dataSource = new MatTableDataSource<any>(this.filteredUsers)
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '800px',
      data: user
    });
  }
  // filterUsers() {
  //   return this.dataSource
  //     .filter(item => this.filterValue ? item.name.toLowerCase().indexOf(this.filterValue.toLowerCase()) !== -1 : item);
  // }

  assignCopy() {
    this.filteredUsers = this.users;
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredUsers = Object.assign([], this.users)
      // .filter((user: User) => {
      //   return user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      // })
      .filter((user: User) => {
        if (user.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        else if (user.workEmail.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return user.workEmail.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        else if (user.phone.indexOf(value) > -1) {
          return user.phone.indexOf(value) > -1
        }
      })
    this.dataSource = new MatTableDataSource<any>(this.filteredUsers)
  }
}
