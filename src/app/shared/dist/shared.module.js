"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var bottom_bar_component_1 = require("./bottom-bar/bottom-bar.component");
var material_module_1 = require("../material.module");
var loader_component_1 = require("./loader/loader.component");
var router_1 = require("@angular/router");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var business_left_sidebar_component_1 = require("./business-left-sidebar/business-left-sidebar.component");
var business_right_sidebar_component_1 = require("./business-right-sidebar/business-right-sidebar.component");
var adminbusiness_left_sidebar_component_1 = require("./adminbusiness-left-sidebar/adminbusiness-left-sidebar.component");
var adminbusiness_right_sidebar_component_1 = require("./adminbusiness-right-sidebar/adminbusiness-right-sidebar.component");
var admin_header_component_1 = require("./admin-header/admin-header.component");
var date_ago_pipe_1 = require("./pipes/date-ago.pipe");
var innerhtml_pipe_1 = require("./pipes/innerhtml.pipe");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var home_search_component_1 = require("./home-search/home-search.component");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
var core_2 = require("@agm/core");
var directives_module_1 = require("../directives/directives.module");
var component = [
    bottom_bar_component_1.BottomBarComponent,
    loader_component_1.LoaderComponent,
    header_component_1.HeaderComponent,
    footer_component_1.FooterComponent,
    business_left_sidebar_component_1.BusinessLeftSidebarComponent,
    business_right_sidebar_component_1.BusinessRightSidebarComponent,
    adminbusiness_left_sidebar_component_1.AdminbusinessLeftSidebarComponent,
    adminbusiness_right_sidebar_component_1.AdminbusinessRightSidebarComponent,
    admin_header_component_1.AdminHeaderComponent,
    home_search_component_1.HomeSearchComponent,
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(component, [
                date_ago_pipe_1.DateAgoPipe, innerhtml_pipe_1.SafeHtmlPipe
            ]),
            exports: __spreadArrays(component, [
                date_ago_pipe_1.DateAgoPipe, innerhtml_pipe_1.SafeHtmlPipe
            ]),
            imports: [
                common_1.CommonModule,
                material_module_1.MaterialModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                icon_1.MatIconModule,
                ngx_owl_carousel_o_1.CarouselModule,
                router_1.RouterModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                mat_select_autocomplete_1.SelectAutocompleteModule,
                ngx_google_places_autocomplete_1.GooglePlaceModule,
                directives_module_1.DirectivesModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyCs3aM7dZ9UsKdxW-0K5iQUDWKz4Fyi-Cg",
                    libraries: ['places']
                })
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
