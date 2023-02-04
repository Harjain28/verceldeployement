import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdminArticlesComponent } from "./admin-articles/admin-articles.component";
import { AdminEventComponent } from "./admin-event/admin-event.component";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SelectAutocompleteModule } from "mat-select-autocomplete";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgOtpInputModule } from "ng-otp-input";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { BranchesComponent } from "./branches/branches.component";
import { BusinessBannerEditComponent } from "./business-banner-edit/business-banner-edit.component";
import { BusinessBranchEditComponent } from "./business-branch-edit/business-branch-edit.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { ProgrammsComponent } from "./programms/programms.component";
import { BusinessEditComponent } from "./business-edit/business-edit.component";
import { BusinessEditProfileComponent } from "./business-edit-profile/business-edit-profile.component";
import { BusinessInboxComponent } from "./business-inbox/business-inbox.component";
import { BusinessNotesComponent } from "./business-notes/business-notes.component";
import { BusinessProfileComponent } from "./business-profile/business-profile.component";
import { BusinessProfileMobileComponent } from "./business-profile-mobile/business-profile-mobile.component";
import { BusinessReviewsComponent } from "./business-reviews/business-reviews.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { AddBusinessMainAddressComponent } from "./add-business-main-address/add-business-main-address.component";
import { AddClassComponent } from "./add-class/add-class.component";
import { AddFaqComponent } from "./add-faq/add-faq.component";
import { AddGalleryComponent } from "./add-gallery/add-gallery.component";
import { AddProgrammsComponent } from "./add-programms/add-programms.component";
import { AddNewBranchComponent } from "./add-new-branch/add-new-branch.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { AddTeachersComponent } from "./add-teachers/add-teachers.component";
import { TeachesComponent } from "./teaches/teaches.component";
import { AdminClassesComponent } from './admin-classes/admin-classes.component';
import { LazyLoadImageModule } from "ng-lazyload-image";
import { MyListingComponent } from "./my-listing/my-listing.component";
import { MarketplaceDetailsComponent } from "./marketplace-details/marketplace-details.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

@NgModule({
  declarations: [AdminComponent, AdminArticlesComponent, AdminEventComponent,
    BranchesComponent, BusinessBannerEditComponent, BusinessBranchEditComponent,
    BusinessDetailsComponent, ProgrammsComponent, BusinessEditComponent,
    BusinessEditProfileComponent, BusinessInboxComponent, BusinessNotesComponent, TeachesComponent,
    BusinessProfileComponent, BusinessProfileMobileComponent, BusinessReviewsComponent, FaqsComponent,
    GalleryComponent, MarketplaceComponent, AddBusinessMainAddressComponent, AddClassComponent, AddFaqComponent,
    AddGalleryComponent, AddProgrammsComponent, MarketplaceDetailsComponent, AddNewBranchComponent, ChangePasswordComponent, AddReviewComponent, AddTeachersComponent, AdminClassesComponent, MyListingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CarouselModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NgOtpInputModule,
    AngularEditorModule,
    SelectAutocompleteModule,
    LazyLoadImageModule
  ],
})
export class AdminModule { }
