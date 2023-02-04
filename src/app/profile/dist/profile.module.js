"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var profile_routing_module_1 = require("./profile-routing.module");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var material_module_1 = require("../material.module");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var profile_setup_component_1 = require("./profile-setup/profile-setup.component");
var shared_module_1 = require("../shared/shared.module");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            declarations: [edit_profile_component_1.EditProfileComponent, profile_setup_component_1.ProfileSetupComponent,],
            imports: [
                common_1.CommonModule,
                profile_routing_module_1.ProfileRoutingModule,
                material_module_1.MaterialModule,
                ngx_owl_carousel_o_1.CarouselModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                ng_lazyload_image_1.LazyLoadImageModule
            ]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
