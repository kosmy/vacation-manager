import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ContentComponent } from './layout/content/content.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
import { VacationRequestModule } from './modules/vacation-request/vacation-request.module';
import { AddUserModule } from './modules/add-user/add-user.module';
import { AddTeamModule } from './modules/add-team/add-team.module';
import { SharedModule } from './modules/shared/shared.module';



@NgModule({
  declarations: [MainComponent, HeaderComponent, NavigationComponent, ContentComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ProfileModule,
    VacationRequestModule,
    AddUserModule,
    AddTeamModule,
    SharedModule
  ]
})
export class MainModule { }
