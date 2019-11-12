import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuardService as AuthGuard } from '../log-in/services/auth-guard.service';
import { RoleGuardService as RoleGuard } from '../log-in/services/role-guard.service';



const routes: Routes = [
    {
        path: 'main', component: MainComponent, children: [
            { loadChildren: './modules/profile/profile.module#ProfileModule', path: 'profile/:id', canActivate: [AuthGuard] },
            { loadChildren: './modules/vacation-request/vacation-request.module#VacationRequestModule', path: 'vacation-request/:id', canActivate: [AuthGuard] },
            {
                loadChildren: './modules/add-edit-user/add-edit-user.module#AddEditUserModule', path: 'add-edit-user', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            {
                loadChildren: './modules/add-edit-team/add-edit-team.module#AddEditTeamModule', path: 'add-edit-team', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            {
                loadChildren: './modules/vacation-request-list/vacation-request-list.module#VacationRequestListModule', path: 'vacation-request-list', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            {
                loadChildren: './modules/user-list/user-list.module#UserListModule', path: 'user-list', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            {
                loadChildren: './modules/team-list/team-list.module#TeamListModule', path: 'team-list', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            {
                loadChildren: './modules/calendar/calendar.module#CalendarModule', path: 'calendar', canActivate: [RoleGuard],
                data: {
                    expectedRole: 'Administrator'
                }
            },
            // { path: '', redirectTo: 'profile/:id', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
