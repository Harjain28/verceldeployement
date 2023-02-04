import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { MaterialModule } from "../material.module";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { VerifySuccessComponent } from "./verify-success/verify-success.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgOtpInputModule } from "ng-otp-input";
import { SelectAutocompleteModule } from "mat-select-autocomplete";
import { Ng2TelInputModule } from "ng2-tel-input";
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { ClaimComponent } from './claim/claim.component';
import { SharedModule } from "../shared/shared.module";
import { SafeHtmlPipe } from "../shared/pipes/innerhtml.pipe";




@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    VerifySuccessComponent,
    ClaimComponent,
  ],

  
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SelectAutocompleteModule,
    NgOtpInputModule,
    Ng2TelInputModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    SharedModule
  ],
})
export class AuthModule {}
