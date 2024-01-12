import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConditionsComponent } from "./components/conditions/conditions.component";

const routes: Routes = [
    { path: 'conditions', component: ConditionsComponent },
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