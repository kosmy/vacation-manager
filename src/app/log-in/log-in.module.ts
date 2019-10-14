import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization.service';
import { SharedModule } from '../main/modules/shared/shared.module';



@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AuthorizationService]
})
export class LogInModule { }
