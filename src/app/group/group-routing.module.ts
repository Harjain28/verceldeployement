import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupDetailsComponent } from "./group-details/group-details.component";
import { GroupSearchComponent } from "./group-search/group-search.component";
import { SeparateDiscussionsComponent } from "./separate-discussions/separate-discussions.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticlesDetailsComponent } from "./articles-details/articles-details.component";
import { RelatedmoresectionComponent } from "./relatedmoresection/relatedmoresection.component";
import { EventemailComponent } from "./eventemail/eventemail.component";

const routes: Routes = [
      {
        path: "group-details",
        component: GroupDetailsComponent,
      },
      {
        path: "group-details/:id",
        component: GroupDetailsComponent,
      },
      {
        path: "group-details/:groupName",
        component: GroupDetailsComponent,
      },
      {
        path: "separate-discussions/:discussionId/:groupName/:groupId",
        component: SeparateDiscussionsComponent,
      },
      {
        path: "event-details/:id",
        component: EventDetailsComponent,
      },
      {
        path: "group",
        component: GroupSearchComponent,
      },
      {
        path: "articles",
        component: ArticlesComponent,
      },
      {
        path: "articles/:type/:value",
        component: ArticlesComponent,
      },
      {
        path: "articles-details/:id",
        component: ArticlesDetailsComponent,
      },
      {
        path: "Related-More/:DetailType/:id/:sectionName",
        component: RelatedmoresectionComponent,
      },
      {
        path: "eventmail",
        component: EventemailComponent,
      },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class GroupRoutingModule { }
