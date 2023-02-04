import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddBusinessMainAddressComponent } from "./add-business-main-address/add-business-main-address.component";
import { AddClassComponent } from "./add-class/add-class.component";
import { AddFaqComponent } from "./add-faq/add-faq.component";
import { AddGalleryComponent } from "./add-gallery/add-gallery.component";
import { AddNewBranchComponent } from "./add-new-branch/add-new-branch.component";
import { AddProgrammsComponent } from "./add-programms/add-programms.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { AddTeachersComponent } from "./add-teachers/add-teachers.component";
import { AdminArticlesComponent } from "./admin-articles/admin-articles.component";
import { AdminClassesComponent } from "./admin-classes/admin-classes.component";
import { AdminEventComponent } from "./admin-event/admin-event.component";
import { AdminComponent } from "./admin.component";
import { BranchesComponent } from "./branches/branches.component";
import { BusinessBranchEditComponent } from "./business-branch-edit/business-branch-edit.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { BusinessEditProfileComponent } from "./business-edit-profile/business-edit-profile.component";
import { BusinessEditComponent } from "./business-edit/business-edit.component";
import { BusinessInboxComponent } from "./business-inbox/business-inbox.component";
import { BusinessNotesComponent } from "./business-notes/business-notes.component";
import { BusinessProfileMobileComponent } from "./business-profile-mobile/business-profile-mobile.component";
import { BusinessProfileComponent } from "./business-profile/business-profile.component";
import { BusinessReviewsComponent } from "./business-reviews/business-reviews.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { MarketplaceDetailsComponent } from "./marketplace-details/marketplace-details.component";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { MyListingComponent } from "./my-listing/my-listing.component";
import { ProgrammsComponent } from "./programms/programms.component";
import { TeachesComponent } from "./teaches/teaches.component";

// import { TeachesComponent } from "./teaches/teaches.component";
// import { AdminGuard } from "./admin.guard";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "admin-class-details/:id/:userId/:token/:AdminId",
        component: AdminClassesComponent,
      },
      {
        path: "admin-marketplace-details/:id/:token/:AdminId",
        component: MarketplaceDetailsComponent,
      },
      {
        path: "admin-classes/",
        component: AdminArticlesComponent,
      },
      {
        path: "my-listing/:userId/:token/:AdminId",
        component: MyListingComponent,
      },
      {
        path: "admin-articles/:id/:userId/:token/:AdminId",
        component: AdminArticlesComponent,
      },
      {
        path: "admin-events/:id/:token/:AdminId",
        component: AdminEventComponent,
      },
      {
        path: "add-review/:userId/:token",
        component: AddReviewComponent,
      },
      {
        path: "reset-password/:userId/:token/:AdminId",
        component: ChangePasswordComponent,
      },
      {
        path: "business-details/:userId/:token/:AdminId",
        component: BusinessDetailsComponent,
      },
      {
        path: "business-branch-edit/:userId/:token/:AdminId",
        component: BusinessBranchEditComponent,
      },
      {
        path: "business-edit/:userId/:token/:AdminId",
        component: BusinessEditComponent,
      },
      {
        path: "add-new-branch/:type/:userId/:token",
        component: AddNewBranchComponent,
      },
      {
        path: "add-new-branch/:type/:id/:userId/:token",
        component: AddNewBranchComponent,
      },
      {
        path: "add-programms/:userId/:token",
        component: AddProgrammsComponent,
      },
      {
        path: "add-programms/:id/:userId/:token",
        component: AddProgrammsComponent,
      },
      {
        path: "add-gallery/:userId/:token",
        component: AddGalleryComponent,
      },
      {
        path: "add-gallery/:id/:userId/:token",
        component: AddGalleryComponent,
      },
      {
        path: "add-teacher/:userId/:token",
        component: AddTeachersComponent,
      },
      {
        path: "add-teacher/:id/:userId/:token",
        component: AddTeachersComponent,
      },
      {
        path: "add-class/:userId/:token",
        component: AddClassComponent,
      },
      {
        path: "business-profile/:userId/:token/:AdminId",
        component: BusinessProfileComponent,
      },
      {
        path: 'marketplace/:token',
        component: MarketplaceComponent,
      },
      {
        path: 'marketplace/:Category/:token',
        component: MarketplaceComponent,
      },
      // {
      //   path: 'marketplace/:userId/:token',
      //   component: MarketplaceComponent,
      // },
      {
        path: 'faqs/:userId/:token/:AdminId',
        component: FaqsComponent,
      },
      {
        path: 'add-faqs/:userId/:token',
        component: AddFaqComponent,
      },
      {
        path: 'add-faqs/:id/:userId/:token',
        component: AddFaqComponent,
      },
      {
        path: 'branches/:userId/:token/:AdminId',
        component: BranchesComponent,
      },
      {
        path: 'teachers/:userId/:token/:AdminId',
        component: TeachesComponent,
      },
      {
        path: 'programms/:userId/:token/:AdminId',
        component: ProgrammsComponent,
      },
      {
        path: 'business-reviews/:userId/:token/:AdminId',
        component: BusinessReviewsComponent,
      },
      {
        path: 'gallery/:userId/:token/:AdminId',
        component: GalleryComponent,
      },
      {
        path: 'programms/:userId/:token/:AdminId',
        component: ProgrammsComponent,
      },
      {
        path: 'business-inbox/:userId/:token/:AdminId',
        component: BusinessInboxComponent,
      },
      {
        path: 'business-edit-profile/:userId/:token',
        component: BusinessEditProfileComponent,
      },
      {
        path: 'add-business-main-address/:userId/:token/:AdminId',
        component: AddBusinessMainAddressComponent,
      },
      {
        path: 'business-notes/:id/:userId/:token/:AdminId',
        component: BusinessNotesComponent,
      },
      {
        path: 'business-notes/:userId/:token/:AdminId',
        component: BusinessNotesComponent,
      }, {
        path: 'business-profle-mobile/:userId/:token/:AdminId',
        component: BusinessProfileMobileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
