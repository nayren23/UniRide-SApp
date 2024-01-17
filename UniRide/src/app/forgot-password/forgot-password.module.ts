import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password.rooting.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    SharedModule,
    ForgotPasswordRoutingModule
  ],
  exports: [
    ForgotPasswordComponent
  ]
})
export class ForgotPasswordModule { }
