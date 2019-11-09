import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamListRoutingModule } from './team-list-routing.module';
import { TeamListComponent } from './team-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamProfileModule } from '../team-profile/team-profile.module';
import { TeamProfileComponent } from '../team-profile/team-profile.component';


@NgModule({
  declarations: [TeamListComponent],
  imports: [
    CommonModule,
    TeamListRoutingModule,
    SharedModule,
    TeamProfileModule
  ],
  entryComponents: [
    TeamProfileComponent
  ]
})
export class TeamListModule { }
