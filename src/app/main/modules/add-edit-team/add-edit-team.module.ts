import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-edit-team-routing.module';
import { AddEditTeamComponent } from './add-edit-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';


@NgModule({
  declarations: [AddEditTeamComponent],
  imports: [
    CommonModule,
    AddTeamRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class AddEditTeamModule { }
