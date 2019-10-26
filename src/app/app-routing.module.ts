import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: 'log-in', component: LogInComponent},
  { path: '', redirectTo: 'log-in', pathMatch: 'full'},
  // { path: 'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
