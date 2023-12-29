import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { TripInfoComponent } from './trip-info/trip-info.component';
import { UserInfoSummaryComponent } from './user-info-summary/user-info-summary.component';
import { DocumentVerificationDisplayComponent } from './document-verification-display/document-verification-display.component';
import { ManageRequestVerificationDocumentComponent } from './manage-request-verification-document/manage-request-verification-document.component';
import { CookieService } from 'ngx-cookie-service';
import { CoreModule } from './core/core.module';
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
    TripInfoComponent,
    UserInfoSummaryComponent,
    DocumentVerificationDisplayComponent,
    ManageRequestVerificationDocumentComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

