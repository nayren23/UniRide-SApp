import { NgModule } from '@angular/core';
import { TripInfoComponent } from './components/trip-info/trip-info.component';
import { UserInfoSummaryComponent } from './components/user-info-summary/user-info-summary.component';
import { SharedModule } from '../shared/shared.module';
import { TripInfoRoutingModule } from './trip-info.rooting.module';


@NgModule({
  declarations: [
    TripInfoComponent,
    UserInfoSummaryComponent
  ],
  imports: [
    SharedModule,
    TripInfoRoutingModule
  ],
  exports: [
    TripInfoComponent,
    UserInfoSummaryComponent
  ]
})
export class TripInfoModule { }
