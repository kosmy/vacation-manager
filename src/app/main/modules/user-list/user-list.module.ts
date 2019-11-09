import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditUserModule } from '../add-edit-user/add-edit-user.module';
import { ProfileModule } from '../profile/profile.module';
import { ProfileComponent } from '../profile/profile.component';
import { UserInfoComponent } from '../profile/components/user-info/user-info.component';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    AddEditUserModule,
    ProfileModule
  ],
  entryComponents: [
    ProfileComponent,
    UserInfoComponent
  ]
})
export class UserListModule { }
