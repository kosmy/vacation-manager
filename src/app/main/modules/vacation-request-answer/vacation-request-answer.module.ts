import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationRequestAnswerComponent } from './vacation-request-answer.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [VacationRequestAnswerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
})
export class VacationRequestAnswerModule { }
