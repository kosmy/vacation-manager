import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { LogInModule } from 'src/app/log-in/log-in.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    LogInModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
