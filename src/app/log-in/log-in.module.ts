import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization.service';



@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  providers: [AuthorizationService]
})
export class LogInModule { }
