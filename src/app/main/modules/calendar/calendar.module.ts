import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule,
    FullCalendarModule,
    FormsModule
  ]
})
export class CalendarModule { }
