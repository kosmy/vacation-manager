import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamRoutingModule } from './add-team-routing.module';
import { AddTeamComponent } from './add-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [AddTeamComponent],
  imports: [
    CommonModule,
    AddTeamRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    
  ]
})
export class AddTeamModule { }
