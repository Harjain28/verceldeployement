"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_gaurd_1 = require("./services/auth.gaurd");
var stoprediection_guard_1 = require("./services/stoprediection.guard");
var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomeModule; }); }
    },
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthModule; }); },
        canActivate: [stoprediection_guard_1.StoprediectionGuard]
    },
    {
        path: 'view',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./view/view.module'); }).then(function (m) { return m.ViewModule; }); }
    },
    {
        path: 'pages',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/pages.module'); }).then(function (m) { return m.PagesModule; }); },
        canActivate: [auth_gaurd_1.AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./profile/profile.module'); }).then(function (m) { return m.ProfileModule; }); },
        canActivate: [auth_gaurd_1.AuthGuard]
    },
    {
        path: "admin",
        loadChildren: function () {
            return Promise.resolve().then(function () { return require("./admin/admin.module"); }).then(function (m) { return m.AdminModule; });
        }
    },
    {
        path: 'group',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./group/group.module'); }).then(function (m) { return m.GroupModule; }); }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, {
                    useHash: true,
                    scrollPositionRestoration: 'enabled',
                    preloadingStrategy: router_1.PreloadAllModules
                })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
