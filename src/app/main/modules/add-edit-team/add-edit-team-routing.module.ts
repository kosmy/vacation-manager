import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTeamComponent } from './add-edit-team.component';


const routes: Routes = [
  { component: AddEditTeamComponent, path: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTeamRoutingModule { }
