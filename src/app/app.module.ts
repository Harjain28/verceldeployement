import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./interceptor/interceptor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { RecaptchaSettings, RECAPTCHA_SETTINGS } from "ng-recaptcha";
// import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    MatIconModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    LazyLoadImageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: RECAPTCHA_SETTINGS, // RECAPTCHA_NONCE
      useValue: {
        siteKey: '6LcyxRcjAAAAAKEftojd6TQ8cNPwRo_M27_xV0A4',
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
