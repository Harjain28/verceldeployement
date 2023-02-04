"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.XsHideDirective = void 0;
var core_1 = require("@angular/core");
var layout_1 = require("@angular/cdk/layout");
var XsHideDirective = /** @class */ (function () {
    function XsHideDirective(breakpointObserver, element, templateRef, viewContainer) {
        this.breakpointObserver = breakpointObserver;
        this.element = element;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    Object.defineProperty(XsHideDirective.prototype, "xsHide", {
        set: function (val) {
            this.method(val);
        },
        enumerable: false,
        configurable: true
    });
    XsHideDirective.prototype.onResize = function (event) {
        this.xsHide();
    };
    XsHideDirective.prototype.method = function (isShow) {
        var _this = this;
        this.breakpointObserver
            .observe([layout_1.Breakpoints.Handset])
            .subscribe(function (state) {
            if (state.matches && !isShow) {
                _this.viewContainer.createEmbeddedView(_this.templateRef);
            }
            else {
                _this.viewContainer.clear();
            }
        });
    };
    __decorate([
        core_1.Input()
    ], XsHideDirective.prototype, "xsHide");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], XsHideDirective.prototype, "onResize");
    XsHideDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line: directive-selector
            selector: '[xsHide]'
        })
    ], XsHideDirective);
    return XsHideDirective;
}());
exports.XsHideDirective = XsHideDirective;
