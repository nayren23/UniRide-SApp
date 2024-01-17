import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConditionsComponent } from "./components/conditions/conditions.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";

const routes: Routes = [
    { path: 'conditions', component: ConditionsComponent },
    { path: 'privacy', component: PrivacyComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class aboutRoutingModule {

}