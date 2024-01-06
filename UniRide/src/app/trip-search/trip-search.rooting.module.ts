import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TripSearchComponent } from "./components/trip-search/trip-search.component";
import { TripSearchResultListComponent } from "./components/trip-search-result-list/trip-search-result-list.component";

const routes: Routes = [
    { path: '', component: TripSearchComponent },
    { path: 'results', component: TripSearchResultListComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TripSearchRoutingModule {

}