import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-edit-team-routing.module';
import { AddEditTeamComponent } from './add-edit-team.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddEditTeamComponent],
  imports: [
    CommonModule,
    AddTeamRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class AddEditTeamModule { }
