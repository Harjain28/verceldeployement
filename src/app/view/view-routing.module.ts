import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CategoriesComponent } from "./categories/categories.component";
import { ClassDetailsComponent } from "./class-details/class-details.component";
import { ClassListComponent } from "./class-list/class-list.component";
import { ContactComponent } from "./contact/contact.component";
import { EventsComponent } from "./events/events.component";
import { HomeSearchComponent } from "../shared/home-search/home-search.component";
import { InboxComponent } from "./inbox/inbox.component";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { MarketplaceDetailsComponent } from "./marketplace-details/marketplace-details.component";
import { HomepagemoreComponent } from "./homepagemore/homepagemore.component";
import { FaqComponent } from "./faq/faq.component";
import { TermsComponent } from "./terms/terms.component";
import { PrivcypolicyComponent } from "./privcypolicy/privcypolicy.component";
import { ContentpolicyComponent } from "./contentpolicy/contentpolicy.component";
import { HelpComponent } from "./help/help.component";
import { CommunityComponent } from "./community/community.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ContactGreetComponent } from "./contact-greet/contact-greet.component";

const routes: Routes = [
  {
    path: "inbox",
    component: InboxComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },

  {
    path: "category",
    component: CategoriesComponent,
  },
  {
    path: "class-list/:id/:value",
    component: ClassListComponent,
  },
  {
    path: "class-list/:id",
    component: ClassListComponent,
  },
  {
    path: "class-details/:id",
    component: ClassDetailsComponent,
  },
  // {
  //   path: "class-details/:id/:branchName",
  //   component: ClassDetailsComponent,
  // },
  // {
  //   path: "search/:searchType",
  //   component: HomeSearchComponent,
  // },
  {
    path: "search/:searchType/:searchValue",
    component: HomeSearchComponent,
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent,
  },
  {
    path: 'marketplace/:Category',
    component: MarketplaceComponent,
  },
  {
    path: "marketplace-details/:id",
    component: MarketplaceDetailsComponent,
  },

  {
    path: "class-list",
    component: ClassListComponent,
  },
  {
    path: "events",
    component: EventsComponent,
  },
  {
    path: "events/:value",
    component: EventsComponent,
  },
  {
    path: "homepage-more/:sectionName",
    component: HomepagemoreComponent,
  },
  {
    path: "aboutUs",
    component: AboutComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "terms&condition",
    component: TermsComponent,
  },
  {
    path: "privacyPolicy",
    component: PrivcypolicyComponent,
  },
  {
    path: "contentPolicy",
    component: ContentpolicyComponent,
  },
  {
    path: "help",
    component: HelpComponent,
  },

  {
    path: "communinty",
    component: CommunityComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
  },
  {
    path: 'contact-successfully',
    component: ContactGreetComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
