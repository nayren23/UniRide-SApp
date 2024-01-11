import { NgModule } from '@angular/core';
import { TripInfoComponent } from './components/trip-info/trip-info.component';
import { UserInfoSummaryComponent } from './components/user-info-summary/user-info-summary.component';
import { SharedModule } from '../shared/shared.module';
import { TripInfoRoutingModule } from './trip-info.rooting.module';
import { PassengersListComponent } from './components/passengers-list/passengers-list.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    TripInfoComponent,
    UserInfoSummaryComponent,
    PassengersListComponent
  ],
  imports: [
    SharedModule,
    TripInfoRoutingModule,
    QRCodeModule
  ],
  exports: [
    TripInfoComponent,
    UserInfoSummaryComponent,
    PassengersListComponent
  ]
})
export class TripInfoModule { }
