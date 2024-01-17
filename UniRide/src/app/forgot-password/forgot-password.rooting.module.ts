import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";

const routes: Routes = [
    { path: ':token', component: ForgotPasswordComponent },
    { path: '', component: ChangePasswordComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ForgotPasswordRoutingModule {

}