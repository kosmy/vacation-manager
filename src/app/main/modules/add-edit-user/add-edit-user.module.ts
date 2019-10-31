import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-edit-user-routing.module';
import { AddEditUserComponent } from './add-edit-user.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddEditUserComponent],
  imports: [
    SharedModule,
    CommonModule,
    AddUserRoutingModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  
})
export class AddEditUserModule { }
