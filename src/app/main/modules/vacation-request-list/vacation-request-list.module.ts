import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRequestListRoutingModule } from './vacation-request-list-routing.module';
import { VacationRequestListComponent } from './vacation-request-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileModule } from '../profile/profile.module';
import { VacationRequestAnswerModule } from '../vacation-request-answer/vacation-request-answer.module';
import { VacationRequestAnswerComponent } from '../vacation-request-answer/vacation-request-answer.component';
import { UserInfoComponent } from '../profile/components/user-info/user-info.component';
import { ProfileComponent } from '../profile/profile.component';


@NgModule({
  declarations: [VacationRequestListComponent],
  imports: [
    CommonModule,
    VacationRequestListRoutingModule,
    SharedModule,
    ProfileModule,
    VacationRequestAnswerModule,
  ],
  entryComponents: [
    VacationRequestAnswerComponent,
    ProfileComponent,
    UserInfoComponent
  ]
})
export class VacationRequestListModule { }
