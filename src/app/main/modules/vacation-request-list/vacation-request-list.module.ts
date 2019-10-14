import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRequestListRoutingModule } from './vacation-request-list-routing.module';
import { VacationRequestListComponent } from './vacation-request-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VacationRequestListComponent],
  imports: [
    CommonModule,
    VacationRequestListRoutingModule,
    MatTableModule,
    MatButtonModule,
    SharedModule
  ]
})
export class VacationRequestListModule { }
