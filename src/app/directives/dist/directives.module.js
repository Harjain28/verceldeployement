"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DirectivesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var xs_hide_directive_1 = require("./xs-hide.directive");
var xx_show_directive_1 = require("./xx-show.directive");
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        core_1.NgModule({
            declarations: [
                xs_hide_directive_1.XsHideDirective,
                xx_show_directive_1.XsShowDirective
            ],
            imports: [
                common_1.CommonModule
            ],
            exports: [
                xs_hide_directive_1.XsHideDirective,
                xx_show_directive_1.XsShowDirective
            ]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());
exports.DirectivesModule = DirectivesModule;
