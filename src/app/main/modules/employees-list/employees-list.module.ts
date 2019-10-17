import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesListRoutingModule } from './employees-list-routing.module';
import { EmployeesListComponent } from './employees-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { AddUserModule } from '../add-user/add-user.module';


@NgModule({
  declarations: [EmployeesListComponent, ],
  imports: [
    CommonModule,
    EmployeesListRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SharedModule,
    AddUserModule,
  ],
  entryComponents: [
  ]
})
export class EmployeesListModule { }
