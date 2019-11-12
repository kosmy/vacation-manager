import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-edit-team-routing.module';
import { AddEditTeamComponent } from './add-edit-team.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@NgModule({
  declarations: [AddEditTeamComponent],
  imports: [
    CommonModule,
    AddTeamRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ]
})
export class AddEditTeamModule { }
