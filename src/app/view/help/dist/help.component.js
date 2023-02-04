"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HelpComponent = void 0;
var core_1 = require("@angular/core");
var HelpComponent = /** @class */ (function () {
    function HelpComponent(router, api) {
        this.router = router;
        this.api = api;
        this.router.getCurrentNavigation().extras.state;
    }
    HelpComponent.prototype.ngOnInit = function () {
        this.help = history.state.data;
        if (!this.help) {
            this.getStaticPageInfo();
        }
    };
    HelpComponent.prototype.getStaticPageInfo = function () {
        var _this = this;
        this.api.get('staticpageinfosection').subscribe(function (res) {
            //console.log(res);
            _this.helps = res.sectionData[1];
            _this.help = _this.helps;
        });
    };
    HelpComponent = __decorate([
        core_1.Component({
            selector: 'app-help',
            templateUrl: './help.component.html',
            styleUrls: ['./help.component.scss']
        })
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;
