"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var material_module_1 = require("./material.module");
var shared_module_1 = require("./shared/shared.module");
var http_1 = require("@angular/common/http");
var interceptor_1 = require("./interceptor/interceptor");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var icon_1 = require("@angular/material/icon");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var compat_1 = require("@angular/fire/compat");
var database_1 = require("@angular/fire/compat/database");
var environment_1 = require("../environments/environment");
// import { AgmCoreModule } from "@agm/core";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                router_1.RouterModule,
                ngx_owl_carousel_o_1.CarouselModule,
                icon_1.MatIconModule,
                material_module_1.MaterialModule,
                shared_module_1.SharedModule,
                http_1.HttpClientModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                compat_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                database_1.AngularFireDatabaseModule,
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: interceptor_1.LoaderInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
