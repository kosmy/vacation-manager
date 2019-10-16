import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from './services/user-data.service';
import { VacationService } from './services/vacation.service';
import { VacationStatusPipe } from './pipes/vacation-status.pipe';
import { VacationTypePipe } from './pipes/vacation-type.pipe';
import { TeamDataService } from './services/team-data.service';
import { VacationRequestUserPipe } from './pipes/vacation-request-user.pipe';



@NgModule({
  declarations: [VacationStatusPipe, VacationTypePipe, VacationRequestUserPipe],
  imports: [
    CommonModule
  ],
  providers: [
    UserDataService,
    VacationService,
    TeamDataService
  ],
  exports: [
    VacationTypePipe,
    VacationStatusPipe,
    VacationRequestUserPipe
  ]
})
export class SharedModule { }
