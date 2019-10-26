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
import { APIService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [VacationStatusPipe, VacationTypePipe, VacationRequestUserPipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [
    UserDataService,
    VacationService,
    TeamDataService,
    APIService
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
