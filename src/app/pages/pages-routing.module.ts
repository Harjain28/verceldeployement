import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShortlistComponent } from "./shortlist/shortlist.component";
import { MyListingComponent } from "./my-listing/my-listing.component";
import { MyBookingComponent } from "./my-booking/my-booking.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { BusinessBranchEditComponent } from "./business-branch-edit/business-branch-edit.component";
import { BusinessBannerEditComponent } from "./business-banner-edit/business-banner-edit.component";
import { AddNewBranchComponent } from "./add-new-branch/add-new-branch.component";
import { AddProgrammsComponent } from "./add-programms/add-programms.component";
import { AddGalleryComponent } from "./add-gallery/add-gallery.component";
import { AddTeachersComponent } from "./add-teachers/add-teachers.component";
import { AddClassComponent } from "./add-class/add-class.component";
import { BusinessProfileComponent } from "./business-profile/business-profile.component";
import { ChatComponent } from "./chat/chat.component";
import { SellComponent } from "./sell/sell.component";
import { BranchesComponent } from "./branches/branches.component";
import { ProgrammsComponent } from "./programms/programms.component";
import { BusinessReviewsComponent } from "./business-reviews/business-reviews.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { TeachesComponent } from "./teaches/teaches.component";
import { BusinessInboxComponent } from "./business-inbox/business-inbox.component";
import { BusinessEditProfileComponent } from "./business-edit-profile/business-edit-profile.component";
import { AddBusinessMainAddressComponent } from "./add-business-main-address/add-business-main-address.component";
import { BusinessNotesComponent } from "./business-notes/business-notes.component";
import { BusinessProfileMobileComponent } from "./business-profile-mobile/business-profile-mobile.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { AddFaqComponent } from "./add-faq/add-faq.component";

const routes: Routes = [

  {
    path: "shortlist",
    component: ShortlistComponent,
  },

  {
    path: "my-listing",
    component: MyListingComponent,
  },
  {
    path: "my-booking",
    component: MyBookingComponent,
  },
  {
    path: "add-review/:id",
    component: AddReviewComponent,
  },
  {
    path: "add-review/:id/:branchName",
    component: AddReviewComponent,
  },
  {
    path: "reviews",
    component: ReviewsComponent,
  },

  {
    path: "business-details",
    component: BusinessDetailsComponent,
  },
  {
    path: "business-branch-edit",
    component: BusinessBranchEditComponent,
  },
  {
    path: "business-banner-edit",
    component: BusinessBannerEditComponent,
  },

  {
    path: "add-new-branch/:type",
    component: AddNewBranchComponent,
  },
  {
    path: "add-new-branch/:type/:id",
    component: AddNewBranchComponent,
  },
  {
    path: "add-programms",
    component: AddProgrammsComponent,
  },
  {
    path: "add-programms/:id",
    component: AddProgrammsComponent,
  },
  {
    path: "add-gallery",
    component: AddGalleryComponent,
  },
  {
    path: "add-gallery/:id",
    component: AddGalleryComponent,
  },
  {
    path: "add-teacher",
    component: AddTeachersComponent,
  },
  {
    path: "add-teacher/:id",
    component: AddTeachersComponent,
  },
  {
    path: "add-class",
    component: AddClassComponent,
  },
  {
    path: "business-profile",
    component: BusinessProfileComponent,
  },
  {
    path: 'chat/:adminid',
    component: ChatComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'sell',
    component: SellComponent,
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'add-faqs',
    component: AddFaqComponent,
  },
  {
    path: 'add-faqs/:id',
    component: AddFaqComponent,
  },
  {
    path: 'branches',
    component: BranchesComponent,
  },
  {
    path: 'programms',
    component: ProgrammsComponent,
  },
  {
    path: 'business-reviews',
    component: BusinessReviewsComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'programms',
    component: ProgrammsComponent,
  },
  {
    path: 'teachers',
    component: TeachesComponent,
  },
  {
    path: 'business-inbox',
    component: BusinessInboxComponent,
  },
  {
    path: 'business-edit-profile',
    component: BusinessEditProfileComponent,
  },
  {
    path: 'add-business-main-address',
    component: AddBusinessMainAddressComponent,
  },
  {
    path: 'business-notes',
    component: BusinessNotesComponent,
  }, {
    path: 'business-profle-mobile',
    component: BusinessProfileMobileComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
