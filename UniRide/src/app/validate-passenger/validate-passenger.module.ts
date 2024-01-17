import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePassengerComponent } from './components/validate-passenger/validate-passenger.component';
import { ValidatePassengerRoutingModule } from './validate-passenger.rooting.module';



@NgModule({
  declarations: [
    ValidatePassengerComponent
  ],
  imports: [
    CommonModule,
    ValidatePassengerRoutingModule
  ],
  exports: [
    ValidatePassengerComponent
  ]
})
export class ValidatePassengerModule { }
