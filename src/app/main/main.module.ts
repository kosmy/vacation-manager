import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ContentComponent } from './layout/content/content.component';
import { MainRoutingModule } from './main-routing.module';
import { ProfileModule } from './modules/profile/profile.module';



@NgModule({
  declarations: [MainComponent, HeaderComponent, NavigationComponent, ContentComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ProfileModule,
  ]
})
export class MainModule { }
