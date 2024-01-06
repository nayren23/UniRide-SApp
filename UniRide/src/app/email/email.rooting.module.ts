import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmailVerificationComponent } from "./components/email-verification/email-verification.component";
import { ResendMailComponent } from "./components/resend-mail/resend-mail.component";
;

const routes: Routes = [
    { path: 'resend', component: ResendMailComponent },
    { path: ':token', component: EmailVerificationComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class EmailRootingModule {

}