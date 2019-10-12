import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';



const routes: Routes = [
    {
        path: 'main', component: MainComponent, children: [
            { loadChildren: './modules/profile/profile.module#ProfileModule', path: 'profile'},
            { path: '', redirectTo: 'profile', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
