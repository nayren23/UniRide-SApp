import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ValidatePassengerComponent } from "./components/validate-passenger/validate-passenger.component";
const routes: Routes = [
    { path: '', component: ValidatePassengerComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class ValidatePassengerRoutingModule {

}