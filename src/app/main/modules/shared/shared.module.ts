import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from './services/user-data.service';
import { VacationService } from './services/vacation.service';
import { VacationStatusPipe } from './pipes/vacation-status.pipe';
import { VacationTypePipe } from './pipes/vacation-type.pipe';



@NgModule({
  declarations: [VacationStatusPipe, VacationTypePipe],
  imports: [
    CommonModule
  ],
  providers: [
    UserDataService,
    VacationService
  ],
  exports: [
    VacationTypePipe,
    VacationStatusPipe,
    // UserDataService,
    // VacationService
  ]
})
export class SharedModule { }
