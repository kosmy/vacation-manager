import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { APIService } from '../shared/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'workEmail', 'vacationsAvailable', 'action', 'filter'];
  userList: User[];
  dataSource;
  filterValue = '';
  filterStatus = '';

  constructor(private userDataService: UserDataService, private dialog: MatDialog, private userAPIService: APIService) { }

  ngOnInit() {
    // this.userList = this.userDataService.getUsers();
    this.dataSource = new MatTableDataSource<any>(this.userDataService.getUsers());
    // this.userAPIService.get().subscribe((response) => {
    //   // this.userList = response;
    //   this.dataSource =  new MatTableDataSource<any>(response);
    // this.dataSource.paginator = this.paginator;
    // });
    this.dataSource.paginator = this.paginator;

  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '800px',
      data: user
    });
  }
  filterUsers() {
    return this.dataSource
      .filter(item => this.filterValue ? item.name.toLowerCase().indexOf(this.filterValue.toLowerCase()) !== -1 : item);
  }

}
