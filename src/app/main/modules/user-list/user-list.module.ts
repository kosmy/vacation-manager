import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditUserModule } from '../add-edit-user/add-edit-user.module';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    AddEditUserModule
  ]
})
export class UserListModule { }
