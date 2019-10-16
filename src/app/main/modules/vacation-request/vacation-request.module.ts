import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationRequestRoutingModule} from './vacation-request-routing.module'
import { VacationRequestComponent } from './vacation-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [VacationRequestComponent],
  imports: [
    CommonModule,
    VacationRequestRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class VacationRequestModule { }
