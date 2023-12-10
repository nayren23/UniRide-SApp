import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import { TripSearchResultComponent } from './trip-search-result/trip-search-result.component';
import { TripSearchResultListComponent } from './trip-search-result-list/trip-search-result-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResendMailComponent } from './resend-mail/resend-mail.component';
import { TripProposedComponent } from './trip-proposed/trip-proposed.component';
import { TripProposedListComponent } from './trip-proposed-list/trip-proposed-list.component';
import { DistancePipe } from './pips/distance/distance.pipe';
import { DocumentVerificationDisplayComponent } from './document-verification-display/document-verification-display.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ManageRequestVerificationDocumentComponent } from './manage-request-verification-document/manage-request-verification-document.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogInComponent,
    CreateTripComponent,
    TripSearchComponent,
    TripSearchResultComponent,
    EmailVerificationComponent,
    ResendMailComponent,
    TripSearchResultComponent,
    TripSearchResultListComponent,
    TripProposedComponent,
    TripProposedListComponent,
    DistancePipe,
    DocumentVerificationDisplayComponent,
    ManageRequestVerificationDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required for toastr animations
    ToastrModule.forRoot(),
    TableModule,
    MultiSelectModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    ImageModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService, { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr);
  }
}

