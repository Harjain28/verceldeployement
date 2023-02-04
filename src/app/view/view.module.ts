import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewRoutingModule } from "./view-routing.module";
import { ClassDetailsComponent } from "./class-details/class-details.component";
import { ClassListComponent } from "./class-list/class-list.component";
import { CategoriesComponent } from "./categories/categories.component";
import { EventsComponent } from "./events/events.component";
import { InboxComponent } from "./inbox/inbox.component";
import { ContactComponent } from "./contact/contact.component";
import { MyBookingComponent } from "../pages/my-booking/my-booking.component";
import { AboutComponent } from "./about/about.component";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { NgOtpInputModule } from "ng-otp-input";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { MarketplaceDetailsComponent } from "./marketplace-details/marketplace-details.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { HomepagemoreComponent } from './homepagemore/homepagemore.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SelectAutocompleteModule } from "mat-select-autocomplete";
import { HelpComponent } from './help/help.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { ContentpolicyComponent } from './contentpolicy/contentpolicy.component';
import { PrivcypolicyComponent } from './privcypolicy/privcypolicy.component';
import { CommunityComponent } from './community/community.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AgmCoreModule } from "@agm/core";
import { DirectivesModule } from "../directives/directives.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { Ng2TelInputModule } from "ng2-tel-input";
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { ContactGreetComponent } from './contact-greet/contact-greet.component';
import { ViewComponent } from "./view.component";


const COMPONENTS = [
  ClassDetailsComponent,
  ClassListComponent,
  CategoriesComponent,
  EventsComponent,
  InboxComponent,
  ViewComponent,
  ContactComponent,
  MyBookingComponent,
  AboutComponent,
  MarketplaceComponent,
  MarketplaceDetailsComponent,
  HomepagemoreComponent,
  ChangePasswordComponent,
  HelpComponent, FaqComponent, TermsComponent, ContentpolicyComponent, PrivcypolicyComponent, CommunityComponent
];

@NgModule({
  declarations: [...COMPONENTS, ContactGreetComponent],

  exports: [...COMPONENTS],

  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    CarouselModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgOtpInputModule,
    NgMultiSelectDropDownModule,
    SelectAutocompleteModule,
    InfiniteScrollModule,
    AgmCoreModule,
    DirectivesModule,
    Ng2TelInputModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD82tPmOmS8SBNjZbj7RlnWSH_1E-WcSvA",
      libraries: ['places']
    })
  ],
})
export class ViewModule { }
