import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientService, HeaderService,ManualAuthService,LoaderService, CommonService, HttpIntercepter, AuthService, LoginActivate, NotificationService} from './app.service'; 
import { ToastrModule } from 'ngx-toastr';
import { ChallengeFilterPipe } from './shared/pipes/challenge.pipe'; 
import { PlayerrolePipe } from './shared/pipes/playerrole.pipe'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';   
 import {Globals} from './global'; 
import { HttpClientModule } from "@angular/common/http";
import {MatInputModule} from '@angular/material/input';  
import { NgOtpInputModule } from  'ng-otp-input';
import { CookieService } from 'ngx-cookie-service';

import { HomeComponent } from './home/home.component';
import { FindInfluencersComponent } from './find-influencers/find-influencers.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { PostAndHireInfluencerComponent } from './post-and-hire-influencer/post-and-hire-influencer.component';
import { BecomeInfluencerComponent } from './become-influencer/become-influencer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'; 
 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule } from '@angular/material/snack-bar'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {DatePipe } from '@angular/common'; 

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { ProfileComponent } from './profile/profile.component';

import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrdersPendingComponent } from './orders-pending/orders-pending.component';
import { CurrentsOrdersComponent } from './currents-orders/currents-orders.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { TrackComponent } from './track/track.component';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { InfulencerUserPanelComponent } from './infulencer-user-panel/infulencer-user-panel.component';
import { MyListingComponent } from './my-listing/my-listing.component';
import { AllListingComponent } from './all-listing/all-listing.component';
import { MyJobComponent } from './my-job/my-job.component';
import { AllJobComponent } from './all-job/all-job.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { AuthenticationGuard } from './authentication.guard';
import { InfluencerMessageComponent } from './influencer-message/influencer-message.component';
import { CreateListingInstagramComponent } from './create-listing-instagram/create-listing-instagram.component';
import { CreateListingYoutubeComponent } from './create-listing-youtube/create-listing-youtube.component';
import { CreateListingTiktokComponent } from './create-listing-tiktok/create-listing-tiktok.component';
import { InfluencerOrdersPendingComponent } from './influencer-orders-pending/influencer-orders-pending.component';
import { InfluencerAllOrdersComponent } from './influencer-all-orders/influencer-all-orders.component';
import { InfluencerCurrentsOrdersComponent } from './influencer-currents-orders/influencer-currents-orders.component';
import { FollowingsComponent } from './followings/followings.component';
import { InfluencerAnalyzerComponent } from './influencer-analyzer/influencer-analyzer.component';
import { InfluencerTransactionHistoryComponent } from './influencer-transaction-history/influencer-transaction-history.component';
import { CustomerDiscoveryComponent } from './customer-discovery/customer-discovery.component';
import { CustomerMessageComponent } from './customer-message/customer-message.component';
import { CreateJobFacebookComponent } from './create-job-facebook/create-job-facebook.component';
import { CreateJobInstagramComponent } from './create-job-instagram/create-job-instagram.component';
import { CreateJobYoutubeComponent } from './create-job-youtube/create-job-youtube.component';
import { CreateJobTiktokComponent } from './create-job-tiktok/create-job-tiktok.component';
import { CustomerOrdersPendingComponent } from './customer-orders-pending/customer-orders-pending.component';
import { CustomerAllOrdersComponent } from './customer-all-orders/customer-all-orders.component';
import { CustomerCurrentTrackYourOrdersComponent } from './customer-current-track-your-orders/customer-current-track-your-orders.component';
import { CustomerAnalyzerComponent } from './customer-analyzer/customer-analyzer.component';
import { CustomerTransactionHistoryComponent } from './customer-transaction-history/customer-transaction-history.component';
import { CustomerCurrentsOrdersComponent } from './customer-currents-orders/customer-currents-orders.component';
import { InfluencerViewProfileComponent } from './influencer-view-profile/influencer-view-profile.component';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { InfluencerCurrentTrackYourOrdersComponent } from './influencer-current-track-your-orders/influencer-current-track-your-orders.component';
import { InfluencerMarketplaceComponent } from './influencer-marketplace/influencer-marketplace.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindInfluencersComponent,
    LoginComponent,
    RegisterComponent,
    ChallengeFilterPipe,
    PlayerrolePipe,
    HeaderComponent,
    FooterComponent,
    HowToBuyComponent,
    HowToSellComponent,
    PostAndHireInfluencerComponent,
    BecomeInfluencerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerificationComponent,
    CategoriesComponent,
    AllOrdersComponent,
    OrdersPendingComponent,
    CurrentsOrdersComponent,
    ConfirmOrderComponent,
    TrackComponent,
    InfluencerProfileComponent,
    CustomerProfileComponent,
    CustomerPanelComponent,
    InfulencerUserPanelComponent,
    MyListingComponent,
    AllListingComponent,
    MyJobComponent,
    AllJobComponent,
    CreateListingComponent,
    InfluencerMessageComponent,
    CreateListingInstagramComponent,
    CreateListingYoutubeComponent,
    CreateListingTiktokComponent,
    InfluencerOrdersPendingComponent,
    InfluencerAllOrdersComponent,
    InfluencerCurrentsOrdersComponent,
    FollowingsComponent,
    InfluencerAnalyzerComponent,
    InfluencerTransactionHistoryComponent,
    CustomerDiscoveryComponent,
    CustomerMessageComponent,
    CreateJobFacebookComponent,
    CreateJobInstagramComponent,
    CreateJobYoutubeComponent,
    CreateJobTiktokComponent,
    CustomerOrdersPendingComponent,
    CustomerAllOrdersComponent,
    CustomerCurrentTrackYourOrdersComponent,
    CustomerAnalyzerComponent,
    CustomerTransactionHistoryComponent,
    CustomerCurrentsOrdersComponent,
    InfluencerViewProfileComponent,
    CustomerViewProfileComponent,
    InfluencerCurrentTrackYourOrdersComponent,
    InfluencerMarketplaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule, 
    ReactiveFormsModule ,
    FormsModule,     
    MatInputModule,
    NgOtpInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    SocialLoginModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    NgxMatIntlTelInputModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [AuthenticationGuard, AuthService, CookieService,DatePipe,Globals,HttpClientService,NotificationService,HeaderService,ManualAuthService,LoginActivate,LoaderService,CommonService,HttpIntercepter,AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
  ], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
 
export class AppModule { }

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1217879225318988")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('846860329862-a4d1eotrq9lt3ot9ib05m591n7q9pr5d.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}
