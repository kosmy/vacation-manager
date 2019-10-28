import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user.component';


const routes: Routes = [
  { component: AddEditUserComponent, path: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserRoutingModule { }
