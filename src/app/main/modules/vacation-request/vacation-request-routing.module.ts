import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacationRequestComponent } from './vacation-request.component';



const routes: Routes = [
    { component: VacationRequestComponent, path: ''}, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VacationRequestRoutingModule { }
