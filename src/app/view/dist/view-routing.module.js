"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./about/about.component");
var categories_component_1 = require("./categories/categories.component");
var class_details_component_1 = require("./class-details/class-details.component");
var class_list_component_1 = require("./class-list/class-list.component");
var contact_component_1 = require("./contact/contact.component");
var events_component_1 = require("./events/events.component");
var home_search_component_1 = require("../shared/home-search/home-search.component");
var inbox_component_1 = require("./inbox/inbox.component");
var sub_categories_component_1 = require("./sub-categories/sub-categories.component");
var marketplace_component_1 = require("./marketplace/marketplace.component");
var marketplace_details_component_1 = require("./marketplace-details/marketplace-details.component");
var homepagemore_component_1 = require("./homepagemore/homepagemore.component");
var faq_component_1 = require("./faq/faq.component");
var terms_component_1 = require("./terms/terms.component");
var privcypolicy_component_1 = require("./privcypolicy/privcypolicy.component");
var contentpolicy_component_1 = require("./contentpolicy/contentpolicy.component");
var help_component_1 = require("./help/help.component");
var community_component_1 = require("./community/community.component");
var more_search_component_1 = require("./more-search/more-search.component");
var routes = [
    {
        path: "inbox",
        component: inbox_component_1.InboxComponent
    },
    {
        path: "about",
        component: about_component_1.AboutComponent
    },
    {
        path: "contact",
        component: contact_component_1.ContactComponent
    },
    {
        path: "category",
        component: categories_component_1.CategoriesComponent
    },
    {
        path: "sub-category",
        component: sub_categories_component_1.SubCategoriesComponent
    },
    {
        path: "class-list/:id/:value",
        component: class_list_component_1.ClassListComponent
    },
    {
        path: "class-list/:id",
        component: class_list_component_1.ClassListComponent
    },
    {
        path: "class-details/:id",
        component: class_details_component_1.ClassDetailsComponent
    },
    // {
    //   path: "class-details/:id/:branchName",
    //   component: ClassDetailsComponent,
    // },
    {
        path: "search",
        component: home_search_component_1.HomeSearchComponent
    },
    {
        path: 'marketplace',
        component: marketplace_component_1.MarketplaceComponent
    },
    {
        path: 'marketplace/:Category',
        component: marketplace_component_1.MarketplaceComponent
    },
    {
        path: "marketplace-details/:id",
        component: marketplace_details_component_1.MarketplaceDetailsComponent
    },
    {
        path: "class-list",
        component: class_list_component_1.ClassListComponent
    },
    {
        path: "events",
        component: events_component_1.EventsComponent
    },
    {
        path: "events/:value",
        component: events_component_1.EventsComponent
    },
    {
        path: "searchmoredataof/:itemName/:searchKey",
        component: more_search_component_1.MoreSearchComponent
    },
    {
        path: "homepage-more/:sectionName",
        component: homepagemore_component_1.HomepagemoreComponent
    },
    {
        path: "aboutUs",
        component: about_component_1.AboutComponent
    },
    {
        path: "faq",
        component: faq_component_1.FaqComponent
    },
    {
        path: "terms&condition",
        component: terms_component_1.TermsComponent
    },
    {
        path: "privacyPolicy",
        component: privcypolicy_component_1.PrivcypolicyComponent
    },
    {
        path: "contentPolicy",
        component: contentpolicy_component_1.ContentpolicyComponent
    },
    {
        path: "help",
        component: help_component_1.HelpComponent
    },
    {
        path: "communinty",
        component: community_component_1.CommunityComponent
    },
];
var ViewRoutingModule = /** @class */ (function () {
    function ViewRoutingModule() {
    }
    ViewRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ViewRoutingModule);
    return ViewRoutingModule;
}());
exports.ViewRoutingModule = ViewRoutingModule;
