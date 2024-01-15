import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateDailyTripComponent } from "./components/create-daily-trip/create-daily-trip.component";

const routes: Routes = [
    { path: '', component: CreateDailyTripComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CreateTripDailyRootingModule {

}