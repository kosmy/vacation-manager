import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRequestListRoutingModule } from './vacation-request-list-routing.module';
import { VacationRequestListComponent } from './vacation-request-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VacationRequestAnswerComponent } from './vacation-request-answer/vacation-request-answer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditUserModule } from '../add-edit-user/add-edit-user.module';


@NgModule({
  declarations: [VacationRequestListComponent, VacationRequestAnswerComponent],
  imports: [
    CommonModule,
    VacationRequestListRoutingModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    AddEditUserModule
  ],
  entryComponents: [
    VacationRequestAnswerComponent
  ]
})
export class VacationRequestListModule { }
