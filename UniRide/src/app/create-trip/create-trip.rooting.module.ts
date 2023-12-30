import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTripComponent } from "./components/create-trip/create-trip.component";

const routes: Routes = [
    { path: '', component: CreateTripComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CreateTripRootingModule {

}