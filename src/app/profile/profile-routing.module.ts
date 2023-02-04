import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MoreprofileComponent } from './moreprofile/moreprofile.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileSetupComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'moreprofiledata/:type',
    component: MoreprofileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
