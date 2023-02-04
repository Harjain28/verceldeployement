"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FooterComponent = void 0;
var core_1 = require("@angular/core");
var FooterComponent = /** @class */ (function () {
    function FooterComponent(api) {
        this.api = api;
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.getStaticPageInfo();
    };
    FooterComponent.prototype.getStaticPageInfo = function () {
        var _this = this;
        this.api.get('staticpageinfosection').subscribe(function (res) {
            //console.log(res);
            _this.sectionInfo = res.sectionData;
            _this.aboutUs = res.sectionData[0];
            _this.help = res.sectionData[1];
            _this.terms = res.sectionData[2];
            _this.contentPolicy = res.sectionData[3];
            _this.privacyPolicy = res.sectionData[4];
            _this.contactUs = res.sectionData[5];
            _this.Faqs = res.sectionData[6];
            _this.communities = res.sectionData[15];
            _this.faceBookLink = res.sectionData[11];
            _this.twitterLink = res.sectionData[12];
            _this.instagramLink = res.sectionData[13];
            //console.log(_this.instagramLink, "dde");
            _this.googleLink = res.sectionData[14];
        });
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.scss']
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
