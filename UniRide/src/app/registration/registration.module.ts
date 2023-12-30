import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration.component';
import { RegistrationRoutingModule } from './trip-search.rooting.module';


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
