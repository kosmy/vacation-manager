import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';



const routes: Routes = [
    {
        path: 'main', component: MainComponent, children: [
            // { component: MainComponent, path: 'main-again'},
            { loadChildren: './modules/profile/profile.module#ProfileModule', path: 'profile/:id'},
            { loadChildren: './modules/vacation-request/vacation-request.module#VacationRequestModule', path: 'vacation-request/:id'},
            { loadChildren: './modules/add-edit-user/add-edit-user.module#AddEditUserModule', path: 'add-edit-user'},
            { loadChildren: './modules/add-team/add-team.module#AddTeamModule', path: 'add-team'},
            { loadChildren: './modules/vacation-request-list/vacation-request-list.module#VacationRequestListModule', path: 'vacation-request-list'},
            { loadChildren: './modules/user-list/user-list.module#UserListModule', path: 'user-list'},                      
            // { path: '', redirectTo: 'profile/:id', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
