  import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FindInfluencersComponent } from './find-influencers/find-influencers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { PostAndHireInfluencerComponent } from './post-and-hire-influencer/post-and-hire-influencer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'; 
import { ProfileComponent } from './profile/profile.component';
import { BecomeInfluencerComponent } from './become-influencer/become-influencer.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrdersPendingComponent } from './orders-pending/orders-pending.component';
import { CurrentsOrdersComponent } from './currents-orders/currents-orders.component';
import { TrackComponent } from './track/track.component';
import { InfluencerComponent } from './influencer/influencer/influencer.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { InfulencerUserPanelComponent } from './infulencer-user-panel/infulencer-user-panel.component';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AuthService } from './app.service';
import { AuthenticationGuard } from './authentication.guard';
import { MyJobComponent } from './my-job/my-job.component';
import { AllJobComponent } from './all-job/all-job.component';
import { MyListingComponent } from './my-listing/my-listing.component';
import { AllListingComponent } from './all-listing/all-listing.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { InfluencerMessageComponent } from './influencer-message/influencer-message.component';
import {InfluencerAllOrdersComponent } from './influencer-all-orders/influencer-all-orders.component';
import { CreateListingInstagramComponent } from './create-listing-instagram/create-listing-instagram.component';
import { CreateListingTiktokComponent } from './create-listing-tiktok/create-listing-tiktok.component';
import { CreateListingYoutubeComponent } from './create-listing-youtube/create-listing-youtube.component';
import { InfluencerCurrentsOrdersComponent } from './influencer-currents-orders/influencer-currents-orders.component';
import { InfluencerOrdersPendingComponent } from './influencer-orders-pending/influencer-orders-pending.component';
import { FollowingsComponent } from './followings/followings.component';
import { InfluencerTransactionHistoryComponent } from './influencer-transaction-history/influencer-transaction-history.component';
import { InfluencerAnalyzerComponent } from './influencer-analyzer/influencer-analyzer.component';
import { CustomerDiscoveryComponent } from './customer-discovery/customer-discovery.component';
import { CustomerTransactionHistoryComponent } from './customer-transaction-history/customer-transaction-history.component';
import { CustomerAnalyzerComponent } from './customer-analyzer/customer-analyzer.component';
import { CustomerCurrentTrackYourOrdersComponent } from './customer-current-track-your-orders/customer-current-track-your-orders.component';
import { CustomerAllOrdersComponent } from './customer-all-orders/customer-all-orders.component';
import { CustomerOrdersPendingComponent } from './customer-orders-pending/customer-orders-pending.component';
import { CreateJobFacebookComponent } from './create-job-facebook/create-job-facebook.component';
import { CreateJobInstagramComponent } from './create-job-instagram/create-job-instagram.component';
import { CreateJobYoutubeComponent } from './create-job-youtube/create-job-youtube.component';
import { CreateJobTiktokComponent } from './create-job-tiktok/create-job-tiktok.component';
import { CustomerCurrentsOrdersComponent } from './customer-currents-orders/customer-currents-orders.component';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { InfluencerViewProfileComponent } from './influencer-view-profile/influencer-view-profile.component';
import { CustomerMessageComponent } from './customer-message/customer-message.component';
import { InfluencerCurrentTrackYourOrdersComponent } from './influencer-current-track-your-orders/influencer-current-track-your-orders.component';
import { InfluencerMarketplaceComponent } from './influencer-marketplace/influencer-marketplace.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'find_infulencers',
    component: FindInfluencersComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'customer-message',
    component: CustomerMessageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [AuthenticationGuard]
  },
  {
    path: 'sign_up',
    component: RegisterComponent
  },
  {
    path: 'how_to_buy',
    component: HowToBuyComponent
  },
  {
    path: 'customer-view-profile',
    component: CustomerViewProfileComponent
  },
  {
    path: 'influencer-view-profile',
    component: InfluencerViewProfileComponent
  },
  {
    path: 'how_to_sell',
    component: HowToSellComponent
  },
  {
    path: 'post_and_hire_influencer',
    component: PostAndHireInfluencerComponent
  },
  {
    path: 'become_a_influencer',
    component: BecomeInfluencerComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset_password',
    component: ResetPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'email_verification',
    component: EmailVerificationComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  }, 
  {
    path: 'all-orders',
    component: AllOrdersComponent
  }, 
  {
    path: 'orders-pending',
    component: OrdersPendingComponent
  }, 
  {
    path: 'currents-orders',
    component: CurrentsOrdersComponent
  }, 
  {
    path: 'customer-orders-pending',
    component: CustomerOrdersPendingComponent
  }, 
  {
    path: 'create-job-facebook',
    component: CreateJobFacebookComponent
  }, 
  {
    path: 'create-job-instagram',
    component: CreateJobInstagramComponent
  }, 
  {
    path: 'create-job-youtube',
    component: CreateJobYoutubeComponent
  }, 
  {
    path: 'create-job-tiktok',
    component: CreateJobTiktokComponent
  }, 
  {
    path: 'customer-currents-orders',
    component: CustomerCurrentsOrdersComponent
  }, 
  {
    path: 'track',
    component: TrackComponent
  }, 
  {
    path: 'followings',
    component: FollowingsComponent
  }, 
  {
    path: 'influencer-panel',
    component: InfulencerUserPanelComponent
  }, 
  {
    path: 'influencer-analyzer',
    component: InfluencerAnalyzerComponent
  }, 
  {
    path: 'influencer-marketplace',
    component: InfluencerMarketplaceComponent
  },
  {
    path: 'influencer-all-orders',
    component: InfluencerAllOrdersComponent
  },
  {
    path: 'influencer-current-track-your-orders',
    component: InfluencerCurrentTrackYourOrdersComponent
  }, 
  {
    path: 'influencer-currents-orders',
    component: InfluencerCurrentsOrdersComponent
  }, 
  {
    path: 'influencer-transaction-history',
    component: InfluencerTransactionHistoryComponent
  },
  {
    path: 'influencer-orders-pending',
    component: InfluencerOrdersPendingComponent
  },
  {
    path: 'customer-panel',
    component: CustomerPanelComponent
  }, 
  {
    path: 'customer-discovery',
    component: CustomerDiscoveryComponent
  }, 
  {
    path: 'influencer-message',
    component: InfluencerMessageComponent
  },
  {
    path: 'influencer-profile',
    component: InfluencerProfileComponent
  }, 
  {
    path: 'customer-profile',
    component: CustomerProfileComponent
  }, 
  {
    path: 'customer-analyzer',
    component: CustomerAnalyzerComponent
  }, 
  {
    path: 'customer-current-track-your-orders',
    component: CustomerCurrentTrackYourOrdersComponent
  }, 
  {
    path: 'customer-all-orders',
    component: CustomerAllOrdersComponent
  }, 
  {
    path: 'customer-transaction-history',
    component: CustomerTransactionHistoryComponent
  }, 
  {
    path: 'my-job',
    component: MyJobComponent
  }, 
  {
    path: 'all-job',
    component: AllJobComponent
  }, 
  {
    path: 'my-listing',
    component: MyListingComponent
  }, 
  {
    path: 'all-listing',
    component: AllListingComponent
  }, 
  {
    path: 'create-listing',
    component: CreateListingComponent
  },
  {
    path: 'create-listing-instagram',
    component: CreateListingInstagramComponent
  },
  {
    path: 'create-listing-tiktok',
    component: CreateListingTiktokComponent
  },
  {
    path: 'create-listing-youtube',
    component: CreateListingYoutubeComponent
  },
  {
    path: 'bussiness_owner',
    loadChildren: () =>
      import('src/app/bussiness-owner/bussiness-owner.module').then(
        (m) => m.BussinessOwnerModule
      ),
  },
  {
    path: 'influencer',
    loadChildren: () =>
      import('src/app/influencer/influencer.module').then(
        (m) => m.InfluencerModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
