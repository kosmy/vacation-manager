import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesListRoutingModule } from './employees-list-routing.module';
import { EmployeesListComponent } from './employees-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [EmployeesListComponent],
  imports: [
    CommonModule,
    EmployeesListRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class EmployeesListModule { }
