import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationRequestAnswerComponent } from './vacation-request-answer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [VacationRequestAnswerComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class VacationRequestAnswerModule { }
