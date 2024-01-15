import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { aboutRoutingModule } from './about.rooting.module';
import { ConditionsComponent } from './components/conditions/conditions.component';



@NgModule({
  declarations: [
    ConditionsComponent
  ],
  imports: [
    SharedModule,
    aboutRoutingModule
  ]
})
export class AboutModule { }
