import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../main/modules/shared/shared.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AuthorizationService } from './services/authorization.service';



@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AuthorizationService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ]
})
export class LogInModule { }
