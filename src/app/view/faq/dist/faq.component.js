"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FaqComponent = void 0;
var core_1 = require("@angular/core");
var FaqComponent = /** @class */ (function () {
    function FaqComponent(router, api) {
        this.router = router;
        this.api = api;
        this.router.getCurrentNavigation().extras.state;
    }
    FaqComponent.prototype.ngOnInit = function () {
        this.faq = history.state.data;
        if (!this.faq) {
            this.getStaticPageInfo();
        }
    };
    FaqComponent.prototype.getStaticPageInfo = function () {
        var _this = this;
        this.api.get('staticpageinfosection').subscribe(function (res) {
            //console.log(res);
            _this.faqs = res.sectionData[6];
            _this.faq = _this.faqs;
        });
    };
    FaqComponent = __decorate([
        core_1.Component({
            selector: 'app-faq',
            templateUrl: './faq.component.html',
            styleUrls: ['./faq.component.scss']
        })
    ], FaqComponent);
    return FaqComponent;
}());
exports.FaqComponent = FaqComponent;
