import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamProfileComponent } from './team-profile.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TeamProfileComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeamProfileModule { }
