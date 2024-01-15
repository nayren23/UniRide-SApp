import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDailyTripComponent } from './components/create-daily-trip/create-daily-trip.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTripDailyRootingModule } from './create-daily-trip.rooting.module';



@NgModule({
  declarations: [
    CreateDailyTripComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreateTripDailyRootingModule
  ],
  exports: [
    CreateDailyTripComponent
  ]
})
export class CreateDailyTripModule { }
