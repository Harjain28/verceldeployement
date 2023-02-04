"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var auth_routing_module_1 = require("./auth-routing.module");
var auth_component_1 = require("./auth.component");
var material_module_1 = require("../material.module");
var verify_email_component_1 = require("./verify-email/verify-email.component");
var verify_success_component_1 = require("./verify-success/verify-success.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_otp_input_1 = require("ng-otp-input");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var ng2_tel_input_1 = require("ng2-tel-input");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                auth_component_1.AuthComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                reset_password_component_1.ResetPasswordComponent,
                verify_email_component_1.VerifyEmailComponent,
                verify_success_component_1.VerifySuccessComponent,
            ],
            imports: [
                common_1.CommonModule,
                auth_routing_module_1.AuthRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_module_1.MaterialModule,
                http_1.HttpClientModule,
                mat_select_autocomplete_1.SelectAutocompleteModule,
                ng_otp_input_1.NgOtpInputModule,
                ng2_tel_input_1.Ng2TelInputModule
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
