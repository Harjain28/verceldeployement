"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var group_routing_module_1 = require("./group-routing.module");
var group_result_component_1 = require("./group-result/group-result.component");
var material_module_1 = require("../material.module");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var group_details_component_1 = require("./group-details/group-details.component");
var group_search_component_1 = require("./group-search/group-search.component");
var group_component_1 = require("./group.component");
var separate_discussions_component_1 = require("./separate-discussions/separate-discussions.component");
var event_details_component_1 = require("./event-details/event-details.component");
var articles_component_1 = require("./articles/articles.component");
var articles_search_component_1 = require("./articles-search/articles-search.component");
var articles_details_component_1 = require("./articles-details/articles-details.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var relatedmoresection_component_1 = require("./relatedmoresection/relatedmoresection.component");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var core_2 = require("@agm/core");
// import { DateAgoPipe } from "../pipes/date-ago.pipe";
var GroupModule = /** @class */ (function () {
    function GroupModule() {
    }
    GroupModule = __decorate([
        core_1.NgModule({
            declarations: [
                group_result_component_1.GroupResultComponent,
                group_details_component_1.GroupDetailsComponent,
                group_search_component_1.GroupSearchComponent,
                group_component_1.GroupComponent,
                separate_discussions_component_1.SeparateDiscussionsComponent,
                event_details_component_1.EventDetailsComponent,
                articles_component_1.ArticlesComponent,
                articles_search_component_1.ArticlesSearchComponent,
                articles_details_component_1.ArticlesDetailsComponent,
                relatedmoresection_component_1.RelatedmoresectionComponent,
            ],
            imports: [
                common_1.CommonModule,
                group_routing_module_1.GroupRoutingModule,
                material_module_1.MaterialModule,
                ngx_owl_carousel_o_1.CarouselModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
                core_2.AgmCoreModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyCs3aM7dZ9UsKdxW-0K5iQUDWKz4Fyi-Cg",
                    libraries: ['places']
                })
            ]
        })
    ], GroupModule);
    return GroupModule;
}());
exports.GroupModule = GroupModule;
