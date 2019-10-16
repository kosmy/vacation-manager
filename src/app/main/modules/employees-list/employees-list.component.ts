import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild (MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'workEmail', 'vacationsAvailable', 'action'];
  userList: User[];
  dataSource;

  constructor(private userDataService: UserDataService, private dialog: MatDialog) { }

  ngOnInit() {
    // this.userList = this.userDataService.getUsers();
    this.dataSource =  new MatTableDataSource<any>(this.userDataService.getUsers());
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: user
    });
  }

}
