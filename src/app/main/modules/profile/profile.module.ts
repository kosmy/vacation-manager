import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserVacationsComponent } from './components/user-vacations/user-vacations.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent, UserInfoComponent, UserVacationsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    UserInfoComponent
  ]
})
export class ProfileModule { }
