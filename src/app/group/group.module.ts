import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GroupRoutingModule } from "./group-routing.module";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { GroupDetailsComponent } from "./group-details/group-details.component";
import { GroupSearchComponent } from "./group-search/group-search.component";
import { GroupComponent } from "./group.component";
import { SeparateDiscussionsComponent } from "./separate-discussions/separate-discussions.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticlesDetailsComponent } from "./articles-details/articles-details.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { RelatedmoresectionComponent } from './relatedmoresection/relatedmoresection.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AgmCoreModule } from "@agm/core";
import { EventemailComponent } from './eventemail/eventemail.component';
import { DirectivesModule } from "../directives/directives.module";


// import { DateAgoPipe } from "../pipes/date-ago.pipe";

@NgModule({
  declarations: [
    GroupDetailsComponent,
    GroupSearchComponent,
    GroupComponent,
    SeparateDiscussionsComponent,
    EventDetailsComponent,
    ArticlesComponent,
    ArticlesDetailsComponent,
    RelatedmoresectionComponent,
    EventemailComponent,
    // DateAgoPipe
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MaterialModule,
    CarouselModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    AgmCoreModule,
    DirectivesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCs3aM7dZ9UsKdxW-0K5iQUDWKz4Fyi-Cg",
      libraries: ['places']
    })
  ],
})
export class GroupModule { }
