import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration.component';
import { RegistrationRoutingModule } from './registration.rooting.module';


@NgModule({
  declarations: [
    RegistrationComponent,
  ],
  imports: [
    SharedModule,
    RegistrationRoutingModule
  ],
  exports: [
    RegistrationComponent,
  ],
})
export class RegistrationModule { }
