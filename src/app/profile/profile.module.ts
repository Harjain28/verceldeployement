import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { MaterialModule } from "../material.module";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ProfileSetupComponent } from "./profile-setup/profile-setup.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { MoreprofileComponent } from './moreprofile/moreprofile.component';
import { Ng2TelInputModule } from "ng2-tel-input";

@NgModule({
  declarations: [EditProfileComponent, ProfileSetupComponent, MoreprofileComponent,],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    CarouselModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LazyLoadImageModule,
    Ng2TelInputModule
  ],
})
export class ProfileModule {}
