"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommunityComponent = void 0;
var core_1 = require("@angular/core");
var CommunityComponent = /** @class */ (function () {
    function CommunityComponent(router, api) {
        this.router = router;
        this.api = api;
        this.router.getCurrentNavigation().extras.state;
    }
    CommunityComponent.prototype.ngOnInit = function () {
        this.community = history.state.data;
        if (!this.community) {
            this.getStaticPageInfo();
        }
    };
    CommunityComponent.prototype.getStaticPageInfo = function () {
        var _this = this;
        this.api.get('staticpageinfosection').subscribe(function (res) {
            //console.log(res);
            _this.communitydata = res.sectionData[15];
            _this.community = _this.communitydata;
        });
    };
    CommunityComponent = __decorate([
        core_1.Component({
            selector: 'app-community',
            templateUrl: './community.component.html',
            styleUrls: ['./community.component.scss']
        })
    ], CommunityComponent);
    return CommunityComponent;
}());
exports.CommunityComponent = CommunityComponent;
