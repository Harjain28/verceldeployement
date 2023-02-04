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
exports.PagesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_module_1 = require("../material.module");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var router_1 = require("@angular/router");
var pages_routing_module_1 = require("./pages-routing.module");
var shared_module_1 = require("../shared/shared.module");
var shortlist_component_1 = require("./shortlist/shortlist.component");
var my_listing_component_1 = require("./my-listing/my-listing.component");
var sub_categories_component_1 = require("../view/sub-categories/sub-categories.component");
var reviews_component_1 = require("./reviews/reviews.component");
var add_review_component_1 = require("./add-review/add-review.component");
var business_details_component_1 = require("./business-details/business-details.component");
var business_branch_edit_component_1 = require("./business-branch-edit/business-branch-edit.component");
var business_banner_edit_component_1 = require("./business-banner-edit/business-banner-edit.component");
var add_new_branch_component_1 = require("./add-new-branch/add-new-branch.component");
var http_1 = require("@angular/common/http");
var icon_1 = require("@angular/material/icon");
var forms_1 = require("@angular/forms");
var add_programms_component_1 = require("./add-programms/add-programms.component");
var add_gallery_component_1 = require("./add-gallery/add-gallery.component");
var ng_otp_input_1 = require("ng-otp-input");
var add_teachers_component_1 = require("./add-teachers/add-teachers.component");
var add_class_component_1 = require("./add-class/add-class.component");
var business_profile_component_1 = require("./business-profile/business-profile.component");
var chat_component_1 = require("./chat/chat.component");
var sell_component_1 = require("./sell/sell.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var branches_component_1 = require("./branches/branches.component");
var programms_component_1 = require("./programms/programms.component");
var teaches_component_1 = require("./teaches/teaches.component");
var gallery_component_1 = require("./gallery/gallery.component");
var business_reviews_component_1 = require("./business-reviews/business-reviews.component");
var business_inbox_component_1 = require("./business-inbox/business-inbox.component");
var business_edit_profile_component_1 = require("./business-edit-profile/business-edit-profile.component");
var add_business_main_address_component_1 = require("./add-business-main-address/add-business-main-address.component");
var business_notes_component_1 = require("./business-notes/business-notes.component");
var business_profile_mobile_component_1 = require("./business-profile-mobile/business-profile-mobile.component");
var angular_editor_1 = require("@kolkov/angular-editor");
var faqs_component_1 = require("./faqs/faqs.component");
var add_faq_component_1 = require("./add-faq/add-faq.component");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var core_2 = require("@agm/core");
var directives_module_1 = require("../directives/directives.module");
// import { AgmCoreModule } from "@agm/core";
// import { GoogleMapsModule } from "@angular/google-maps";
var COMPONENTS = [
    shortlist_component_1.ShortlistComponent,
    my_listing_component_1.MyListingComponent,
    sub_categories_component_1.SubCategoriesComponent,
    reviews_component_1.ReviewsComponent,
    add_review_component_1.AddReviewComponent,
    business_details_component_1.BusinessDetailsComponent,
    business_branch_edit_component_1.BusinessBranchEditComponent,
    business_banner_edit_component_1.BusinessBannerEditComponent,
    add_new_branch_component_1.AddNewBranchComponent,
    add_programms_component_1.AddProgrammsComponent,
    add_gallery_component_1.AddGalleryComponent,
    add_teachers_component_1.AddTeachersComponent,
    faqs_component_1.FaqsComponent,
    add_class_component_1.AddClassComponent,
    business_profile_component_1.BusinessProfileComponent,
    chat_component_1.ChatComponent,
    add_faq_component_1.AddFaqComponent,
    sell_component_1.SellComponent,
    branches_component_1.BranchesComponent,
    programms_component_1.ProgrammsComponent,
    teaches_component_1.TeachesComponent,
    gallery_component_1.GalleryComponent,
    business_reviews_component_1.BusinessReviewsComponent,
    business_inbox_component_1.BusinessInboxComponent,
    business_edit_profile_component_1.BusinessEditProfileComponent,
    add_business_main_address_component_1.AddBusinessMainAddressComponent,
    business_notes_component_1.BusinessNotesComponent,
    business_profile_mobile_component_1.BusinessProfileMobileComponent,
];
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(COMPONENTS),
            exports: __spreadArrays(COMPONENTS),
            imports: [
                common_1.CommonModule,
                material_module_1.MaterialModule,
                ngx_owl_carousel_o_1.CarouselModule,
                router_1.RouterModule,
                pages_routing_module_1.PagesRoutingModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                icon_1.MatIconModule,
                http_1.HttpClientModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                ng_otp_input_1.NgOtpInputModule,
                angular_editor_1.AngularEditorModule,
                mat_select_autocomplete_1.SelectAutocompleteModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                core_2.AgmCoreModule,
                directives_module_1.DirectivesModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyCs3aM7dZ9UsKdxW-0K5iQUDWKz4Fyi-Cg",
                    libraries: ['places']
                })
            ]
        })
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
