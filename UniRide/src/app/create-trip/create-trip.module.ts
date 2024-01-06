import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTripRootingModule } from './create-trip.rooting.module';


@NgModule({
  declarations: [
    CreateTripComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreateTripRootingModule
  ],
  exports: [
    CreateTripComponent
  ],
})
export class CreateTripModule { }
