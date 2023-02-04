import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { MaterialModule } from '../material.module';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BusinessLeftSidebarComponent } from './business-left-sidebar/business-left-sidebar.component';
import { BusinessRightSidebarComponent } from './business-right-sidebar/business-right-sidebar.component';
import { AdminbusinessLeftSidebarComponent } from './adminbusiness-left-sidebar/adminbusiness-left-sidebar.component';
import { AdminbusinessRightSidebarComponent } from './adminbusiness-right-sidebar/adminbusiness-right-sidebar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SafeHtmlPipe } from './pipes/innerhtml.pipe';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HomeSearchComponent } from './home-search/home-search.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { DirectivesModule } from '../directives/directives.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const component = [
  BottomBarComponent,
  LoaderComponent,
  HeaderComponent,
  FooterComponent,
  BusinessLeftSidebarComponent,
  BusinessRightSidebarComponent,
  AdminbusinessLeftSidebarComponent,
  AdminbusinessRightSidebarComponent,
  AdminHeaderComponent,
  HomeSearchComponent,
  
];

@NgModule({
  declarations: [
  ...component,DateAgoPipe,SafeHtmlPipe
  ],

   exports: [
    ...component,DateAgoPipe,SafeHtmlPipe
   ],

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule, 
    CarouselModule,
    RouterModule,
    LazyLoadImageModule,
    NgMultiSelectDropDownModule,
    SelectAutocompleteModule,
    GooglePlaceModule,
    DirectivesModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD82tPmOmS8SBNjZbj7RlnWSH_1E-WcSvA",
      libraries: ['places']
    })
  ]
})
export class SharedModule { }
