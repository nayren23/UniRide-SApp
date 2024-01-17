import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResendMailComponent } from './components/resend-mail/resend-mail.component';
import { EmailRootingModule } from './email.rooting.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EmailVerificationComponent,
    ResendMailComponent
  ],
  imports: [
    SharedModule,
    EmailRootingModule
  ],
  exports: [
    EmailVerificationComponent,
    ResendMailComponent
  ]
})
export class EmailModule { }
