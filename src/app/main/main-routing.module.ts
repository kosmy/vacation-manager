import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';



const routes: Routes = [
    {
        path: 'main', component: MainComponent, children: [
            { loadChildren: './modules/profile/profile.module#ProfileModule', path: 'profile/:id'},
            { loadChildren: './modules/vacation-request/vacation-request.module#VacationRequestModule', path: 'vacation-request/:id'},            { loadChildren: './modules/vacation-request/vacation-request.module#VacationRequestModule', path: 'vacation-request'},
            { loadChildren: './modules/add-user/add-user.module#AddUserModule', path: 'add-user'},
            { loadChildren: './modules/add-team/add-team.module#AddTeamModule', path: 'add-team'},
            { path: '', redirectTo: 'profile', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
