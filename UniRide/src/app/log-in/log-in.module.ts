import { NgModule } from '@angular/core';
import { LogInComponent } from './components/log-in.component';
import { SharedModule } from '../shared/shared.module';
import { LogInRoutingModule } from './trip-search.rooting.module';



@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    SharedModule,
    LogInRoutingModule
  ],
  exports: [
    LogInComponent
  ],
})
export class LogInModule { }
