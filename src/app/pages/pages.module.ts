import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ShortlistComponent } from "./shortlist/shortlist.component";
import { MyListingComponent } from "./my-listing/my-listing.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { BusinessBranchEditComponent } from "./business-branch-edit/business-branch-edit.component";
import { BusinessBannerEditComponent } from "./business-banner-edit/business-banner-edit.component";
import { AddNewBranchComponent } from "./add-new-branch/add-new-branch.component";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddProgrammsComponent } from "./add-programms/add-programms.component";
import { AddGalleryComponent } from "./add-gallery/add-gallery.component";
import { NgOtpInputModule } from "ng-otp-input";
import { AddTeachersComponent } from "./add-teachers/add-teachers.component";
import { AddClassComponent } from "./add-class/add-class.component";
import { BusinessProfileComponent } from "./business-profile/business-profile.component";
import { ChatComponent } from "./chat/chat.component";
import { SellComponent } from "./sell/sell.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SelectAutocompleteModule } from "mat-select-autocomplete";
import { BranchesComponent } from './branches/branches.component';
import { ProgrammsComponent } from './programms/programms.component';
import { TeachesComponent } from './teaches/teaches.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BusinessReviewsComponent } from './business-reviews/business-reviews.component';
import { BusinessInboxComponent } from './business-inbox/business-inbox.component';
import { BusinessEditProfileComponent } from './business-edit-profile/business-edit-profile.component';
import { AddBusinessMainAddressComponent } from './add-business-main-address/add-business-main-address.component';
import { BusinessNotesComponent } from './business-notes/business-notes.component';
import { BusinessProfileMobileComponent } from './business-profile-mobile/business-profile-mobile.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { FaqsComponent } from "./faqs/faqs.component";
import { AddFaqComponent } from "./add-faq/add-faq.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { AgmCoreModule } from "@agm/core"; 
import { DirectivesModule } from "../directives/directives.module";
import { PagesComponent } from "./pages.component";
// import { AgmCoreModule } from "@agm/core";
// import { GoogleMapsModule } from "@angular/google-maps";


const COMPONENTS = [
  PagesComponent,
  ShortlistComponent,
  MyListingComponent,
  ReviewsComponent,
  AddReviewComponent,
  BusinessDetailsComponent,
  BusinessBranchEditComponent,
  BusinessBannerEditComponent,
  AddNewBranchComponent,
  AddProgrammsComponent,
  AddGalleryComponent,
  AddTeachersComponent,
  FaqsComponent,
  AddClassComponent,
  BusinessProfileComponent,
  ChatComponent,
  AddFaqComponent,
  SellComponent,
  BranchesComponent,
  ProgrammsComponent,
  TeachesComponent,
  GalleryComponent,
  BusinessReviewsComponent,
  BusinessInboxComponent,
  BusinessEditProfileComponent,
  AddBusinessMainAddressComponent,
  BusinessNotesComponent,
  BusinessProfileMobileComponent,

];

@NgModule({
  declarations: [...COMPONENTS],

  exports: [...COMPONENTS],

  imports: [
    CommonModule,
    MaterialModule,
    CarouselModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NgOtpInputModule,
    AngularEditorModule,
    SelectAutocompleteModule,
    LazyLoadImageModule,
    AgmCoreModule,
    DirectivesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD82tPmOmS8SBNjZbj7RlnWSH_1E-WcSvA",
      libraries: ['places']
    })
  ],
})
export class PagesModule { }
