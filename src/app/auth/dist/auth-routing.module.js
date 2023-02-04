"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_component_1 = require("./auth.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var verify_email_component_1 = require("./verify-email/verify-email.component");
var routes = [
    {
        path: '',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: 'login/:type',
                component: login_component_1.LoginComponent
            },
            {
                path: 'register/:type',
                component: register_component_1.RegisterComponent
            },
            {
                path: 'email-verify',
                component: verify_email_component_1.VerifyEmailComponent
            },
            {
                path: 'reset-password',
                component: reset_password_component_1.ResetPasswordComponent
            },
        ]
    },
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
exports.AuthRoutingModule = AuthRoutingModule;
