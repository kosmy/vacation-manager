import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from './services/user-data.service';
import { VacationAPIService } from './services/vacation-api.service';
import { VacationStatusPipe } from './pipes/vacation-status.pipe';
import { VacationTypePipe } from './pipes/vacation-type.pipe';
import { TeamAPIService } from './services/team-api.service';
import { VacationRequestUserPipe } from './pipes/vacation-request-user.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserAPIService } from './services/user-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [VacationStatusPipe, VacationTypePipe, VacationRequestUserPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [
    UserDataService,
    VacationAPIService,
    TeamAPIService,
    UserAPIService
  ],
  exports: [
    VacationTypePipe,
    VacationStatusPipe,
    VacationRequestUserPipe,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class SharedModule { }
