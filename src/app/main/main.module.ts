import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
import { VacationRequestModule } from './modules/vacation-request/vacation-request.module';
import { AddEditUserModule } from './modules/add-edit-user/add-edit-user.module';
import { SharedModule } from './modules/shared/shared.module';
import { UserListModule } from './modules/user-list/user-list.module';
import { VacationRequestListModule } from './modules/vacation-request-list/vacation-request-list.module';
import { VacationRequestAnswerModule } from './modules/vacation-request-answer/vacation-request-answer.module';
import { AddEditTeamModule } from './modules/add-edit-team/add-edit-team.module';
import { TeamListModule } from './modules/team-list/team-list.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TeamProfileModule } from './modules/team-profile/team-profile.module';
import { LogInModule } from '../log-in/log-in.module';


@NgModule({
  declarations: [MainComponent, HeaderComponent, ContentComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
    ProfileModule,
    VacationRequestModule,
    AddEditUserModule,
    AddEditTeamModule,
    SharedModule,
    VacationRequestListModule,
    UserListModule,
    VacationRequestAnswerModule,
    TeamListModule,
    CalendarModule,
    TeamProfileModule,
    LogInModule
  ]
})
export class MainModule { }
