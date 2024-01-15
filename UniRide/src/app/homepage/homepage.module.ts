import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageRoutingModule } from './homepage.rooting.module';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    SharedModule,
    HomePageRoutingModule
  ],

})
export class HomepageModule { }
