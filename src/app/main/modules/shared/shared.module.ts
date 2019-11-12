import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationAPIService } from './services/vacation-api.service';
import { VacationStatusPipe } from './pipes/vacation-status.pipe';
import { TeamAPIService } from './services/team-api.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserAPIService } from './services/user-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TransactionApiService } from './services/transaction-api.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [VacationStatusPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule

  ],
  providers: [
    TransactionApiService,
    VacationAPIService,
    TeamAPIService,
    UserAPIService,
    // AuthInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  exports: [
    VacationStatusPipe,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule
  ]
})
export class SharedModule { }
