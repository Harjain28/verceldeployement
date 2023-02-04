"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var group_details_component_1 = require("./group-details/group-details.component");
var group_result_component_1 = require("./group-result/group-result.component");
var group_search_component_1 = require("./group-search/group-search.component");
var group_component_1 = require("./group.component");
var separate_discussions_component_1 = require("./separate-discussions/separate-discussions.component");
var event_details_component_1 = require("./event-details/event-details.component");
var articles_component_1 = require("./articles/articles.component");
var articles_search_component_1 = require("./articles-search/articles-search.component");
var articles_details_component_1 = require("./articles-details/articles-details.component");
var relatedmoresection_component_1 = require("./relatedmoresection/relatedmoresection.component");
var eventemail_component_1 = require("./eventemail/eventemail.component");
var routes = [
    {
        path: "",
        component: group_component_1.GroupComponent,
        children: [
            {
                path: "group-result",
                component: group_result_component_1.GroupResultComponent
            },
            {
                path: "group-details",
                component: group_details_component_1.GroupDetailsComponent
            },
            {
                path: "group-details/:id",
                component: group_details_component_1.GroupDetailsComponent
            },
            {
                path: "group-details/:groupName",
                component: group_details_component_1.GroupDetailsComponent
            },
            {
                path: "separate-discussions/:discussionId/:groupName/:groupId",
                component: separate_discussions_component_1.SeparateDiscussionsComponent
            },
            {
                path: "event-details/:id",
                component: event_details_component_1.EventDetailsComponent
            },
            {
                path: "group",
                component: group_search_component_1.GroupSearchComponent
            },
            {
                path: "articles",
                component: articles_component_1.ArticlesComponent
            },
            {
                path: "articles/:type/:value",
                component: articles_component_1.ArticlesComponent
            },
            {
                path: "articles-search",
                component: articles_search_component_1.ArticlesSearchComponent
            },
            {
                path: "articles-details/:id",
                component: articles_details_component_1.ArticlesDetailsComponent
            },
            {
                path: "Related-More/:DetailType/:id/:sectionName",
                component: relatedmoresection_component_1.RelatedmoresectionComponent
            },
            {
                path: "eventmail",
                component: eventemail_component_1.EventemailComponent
            },
        ]
    },
];
var GroupRoutingModule = /** @class */ (function () {
    function GroupRoutingModule() {
    }
    GroupRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes),],
            exports: [router_1.RouterModule]
        })
    ], GroupRoutingModule);
    return GroupRoutingModule;
}());
exports.GroupRoutingModule = GroupRoutingModule;
