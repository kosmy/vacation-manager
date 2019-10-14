import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacationRequestListComponent } from './vacation-request-list.component';


const routes: Routes = [
  { component: VacationRequestListComponent, path: ''}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationRequestListRoutingModule { }
