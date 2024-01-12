import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentVerificationDisplayComponent } from "./components/document-verification-display/document-verification-display.component";
import { ManageRequestVerificationDocumentComponent } from "./components/manage-request-verification-document/manage-request-verification-document.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserInfoAdminComponent } from "./components/user-info-admin/user-info-admin.component";
import { ManageLabelAdminComponent } from "./components/manage-label-admin/manage-label-admin.component";

const routes: Routes = [
    { path: 'documents', component: DocumentVerificationDisplayComponent },
    { path: 'documents/verify', component: ManageRequestVerificationDocumentComponent },
    { path: 'users/:id', component: UserInfoAdminComponent },
    { path: 'users', component: UserListComponent },
    { path: 'labels', component: ManageLabelAdminComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}