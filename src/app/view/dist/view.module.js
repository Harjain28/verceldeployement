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
exports.ViewModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var view_routing_module_1 = require("./view-routing.module");
var class_details_component_1 = require("./class-details/class-details.component");
var class_list_component_1 = require("./class-list/class-list.component");
var categories_component_1 = require("./categories/categories.component");
var events_component_1 = require("./events/events.component");
var inbox_component_1 = require("./inbox/inbox.component");
var contact_component_1 = require("./contact/contact.component");
var my_booking_component_1 = require("../pages/my-booking/my-booking.component");
var about_component_1 = require("./about/about.component");
var material_module_1 = require("../material.module");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var icon_1 = require("@angular/material/icon");
var http_1 = require("@angular/common/http");
var ng_otp_input_1 = require("ng-otp-input");
var marketplace_component_1 = require("./marketplace/marketplace.component");
var marketplace_details_component_1 = require("./marketplace-details/marketplace-details.component");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var homepagemore_component_1 = require("./homepagemore/homepagemore.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var help_component_1 = require("./help/help.component");
var faq_component_1 = require("./faq/faq.component");
var terms_component_1 = require("./terms/terms.component");
var contentpolicy_component_1 = require("./contentpolicy/contentpolicy.component");
var privcypolicy_component_1 = require("./privcypolicy/privcypolicy.component");
var community_component_1 = require("./community/community.component");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var more_search_component_1 = require("./more-search/more-search.component");
var core_2 = require("@agm/core");
var directives_module_1 = require("../directives/directives.module");
var COMPONENTS = [
    class_details_component_1.ClassDetailsComponent,
    class_list_component_1.ClassListComponent,
    categories_component_1.CategoriesComponent,
    events_component_1.EventsComponent,
    inbox_component_1.InboxComponent,
    contact_component_1.ContactComponent,
    my_booking_component_1.MyBookingComponent,
    about_component_1.AboutComponent,
    marketplace_component_1.MarketplaceComponent,
    marketplace_details_component_1.MarketplaceDetailsComponent,
    homepagemore_component_1.HomepagemoreComponent
];
var ViewModule = /** @class */ (function () {
    function ViewModule() {
    }
    ViewModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(COMPONENTS, [help_component_1.HelpComponent, faq_component_1.FaqComponent, terms_component_1.TermsComponent, contentpolicy_component_1.ContentpolicyComponent, privcypolicy_component_1.PrivcypolicyComponent, community_component_1.CommunityComponent, more_search_component_1.MoreSearchComponent,]),
            exports: __spreadArrays(COMPONENTS),
            imports: [
                common_1.CommonModule,
                view_routing_module_1.ViewRoutingModule,
                material_module_1.MaterialModule,
                ngx_owl_carousel_o_1.CarouselModule,
                router_1.RouterModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                icon_1.MatIconModule,
                http_1.HttpClientModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                ng_otp_input_1.NgOtpInputModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                mat_select_autocomplete_1.SelectAutocompleteModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
                core_2.AgmCoreModule,
                directives_module_1.DirectivesModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyCs3aM7dZ9UsKdxW-0K5iQUDWKz4Fyi-Cg",
                    libraries: ['places']
                })
            ]
        })
    ], ViewModule);
    return ViewModule;
}());
exports.ViewModule = ViewModule;
