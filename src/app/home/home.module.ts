import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule } from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    MaterialModule,
    FormsModule,
    LazyLoadImageModule,
    LayoutModule,
    GooglePlaceModule,

  ],
})
export class HomeModule {}
