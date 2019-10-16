import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from './services/user-data.service';
import { VacationService } from './services/vacation.service';
import { VacationStatusPipe } from './pipes/vacation-status.pipe';
import { VacationTypePipe } from './pipes/vacation-type.pipe';
import { TeamDataService } from './services/team-data.service';
import { VacationRequestUserPipe } from './pipes/vacation-request-user.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [VacationStatusPipe, VacationTypePipe, VacationRequestUserPipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    UserDataService,
    VacationService,
    TeamDataService
  ],
  exports: [
    VacationTypePipe,
    VacationStatusPipe,
    VacationRequestUserPipe,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class SharedModule { }
