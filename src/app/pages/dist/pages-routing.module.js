"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shortlist_component_1 = require("./shortlist/shortlist.component");
var my_listing_component_1 = require("./my-listing/my-listing.component");
var my_booking_component_1 = require("./my-booking/my-booking.component");
var add_review_component_1 = require("./add-review/add-review.component");
var reviews_component_1 = require("./reviews/reviews.component");
var business_details_component_1 = require("./business-details/business-details.component");
var business_branch_edit_component_1 = require("./business-branch-edit/business-branch-edit.component");
var business_banner_edit_component_1 = require("./business-banner-edit/business-banner-edit.component");
var add_new_branch_component_1 = require("./add-new-branch/add-new-branch.component");
var add_programms_component_1 = require("./add-programms/add-programms.component");
var add_gallery_component_1 = require("./add-gallery/add-gallery.component");
var add_teachers_component_1 = require("./add-teachers/add-teachers.component");
var add_class_component_1 = require("./add-class/add-class.component");
var business_profile_component_1 = require("./business-profile/business-profile.component");
var chat_component_1 = require("./chat/chat.component");
var sell_component_1 = require("./sell/sell.component");
var branches_component_1 = require("./branches/branches.component");
var programms_component_1 = require("./programms/programms.component");
var business_reviews_component_1 = require("./business-reviews/business-reviews.component");
var gallery_component_1 = require("./gallery/gallery.component");
var teaches_component_1 = require("./teaches/teaches.component");
var business_inbox_component_1 = require("./business-inbox/business-inbox.component");
var business_edit_profile_component_1 = require("./business-edit-profile/business-edit-profile.component");
var add_business_main_address_component_1 = require("./add-business-main-address/add-business-main-address.component");
var business_notes_component_1 = require("./business-notes/business-notes.component");
var business_profile_mobile_component_1 = require("./business-profile-mobile/business-profile-mobile.component");
var faqs_component_1 = require("./faqs/faqs.component");
var add_faq_component_1 = require("./add-faq/add-faq.component");
var routes = [
    {
        path: "shortlist",
        component: shortlist_component_1.ShortlistComponent
    },
    {
        path: "my-listing",
        component: my_listing_component_1.MyListingComponent
    },
    {
        path: "my-booking",
        component: my_booking_component_1.MyBookingComponent
    },
    {
        path: "add-review/:id",
        component: add_review_component_1.AddReviewComponent
    },
    {
        path: "add-review/:id/:branchName",
        component: add_review_component_1.AddReviewComponent
    },
    {
        path: "reviews",
        component: reviews_component_1.ReviewsComponent
    },
    {
        path: "business-details",
        component: business_details_component_1.BusinessDetailsComponent
    },
    {
        path: "business-branch-edit",
        component: business_branch_edit_component_1.BusinessBranchEditComponent
    },
    {
        path: "business-banner-edit",
        component: business_banner_edit_component_1.BusinessBannerEditComponent
    },
    {
        path: "add-new-branch/:type",
        component: add_new_branch_component_1.AddNewBranchComponent
    },
    {
        path: "add-new-branch/:type/:id",
        component: add_new_branch_component_1.AddNewBranchComponent
    },
    {
        path: "add-programms",
        component: add_programms_component_1.AddProgrammsComponent
    },
    {
        path: "add-programms/:id",
        component: add_programms_component_1.AddProgrammsComponent
    },
    {
        path: "add-gallery",
        component: add_gallery_component_1.AddGalleryComponent
    },
    {
        path: "add-gallery/:id",
        component: add_gallery_component_1.AddGalleryComponent
    },
    {
        path: "add-teacher",
        component: add_teachers_component_1.AddTeachersComponent
    },
    {
        path: "add-teacher/:id",
        component: add_teachers_component_1.AddTeachersComponent
    },
    {
        path: "add-class",
        component: add_class_component_1.AddClassComponent
    },
    {
        path: "business-profile",
        component: business_profile_component_1.BusinessProfileComponent
    },
    {
        path: 'chat/:adminid',
        component: chat_component_1.ChatComponent
    },
    {
        path: 'chat',
        component: chat_component_1.ChatComponent
    },
    {
        path: 'sell',
        component: sell_component_1.SellComponent
    },
    {
        path: 'faqs',
        component: faqs_component_1.FaqsComponent
    },
    {
        path: 'add-faqs',
        component: add_faq_component_1.AddFaqComponent
    },
    {
        path: 'add-faqs/:id',
        component: add_faq_component_1.AddFaqComponent
    },
    {
        path: 'branches',
        component: branches_component_1.BranchesComponent
    },
    {
        path: 'programms',
        component: programms_component_1.ProgrammsComponent
    },
    {
        path: 'business-reviews',
        component: business_reviews_component_1.BusinessReviewsComponent
    },
    {
        path: 'gallery',
        component: gallery_component_1.GalleryComponent
    },
    {
        path: 'programms',
        component: programms_component_1.ProgrammsComponent
    },
    {
        path: 'teachers',
        component: teaches_component_1.TeachesComponent
    },
    {
        path: 'business-inbox',
        component: business_inbox_component_1.BusinessInboxComponent
    },
    {
        path: 'business-edit-profile',
        component: business_edit_profile_component_1.BusinessEditProfileComponent
    },
    {
        path: 'add-business-main-address',
        component: add_business_main_address_component_1.AddBusinessMainAddressComponent
    },
    {
        path: 'business-notes',
        component: business_notes_component_1.BusinessNotesComponent
    }, {
        path: 'business-profle-mobile',
        component: business_profile_mobile_component_1.BusinessProfileMobileComponent
    },
];
var PagesRoutingModule = /** @class */ (function () {
    function PagesRoutingModule() {
    }
    PagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PagesRoutingModule);
    return PagesRoutingModule;
}());
exports.PagesRoutingModule = PagesRoutingModule;
