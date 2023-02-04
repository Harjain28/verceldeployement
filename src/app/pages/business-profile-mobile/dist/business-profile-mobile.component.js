"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessProfileMobileComponent = void 0;
var core_1 = require("@angular/core");
var BusinessProfileMobileComponent = /** @class */ (function () {
    function BusinessProfileMobileComponent(storage, router, breakpointObserver) {
        this.storage = storage;
        this.router = router;
        this.breakpointObserver = breakpointObserver;
    }
    BusinessProfileMobileComponent.prototype.ngOnInit = function () {
        this.loginOrNot();
        if (this.router.url === '/pages/business-profle-mobile') {
            this.breakpointObserver
                .observe(['(min-width: 500px)'])
                .subscribe(function (state) {
                // if (state.matches) {
                //     this.router.navigate(['/pages/business-details']);
                // } else {
                //    this.router.navigate(['/pages/business-profle-mobile']);
                // }
            });
        }
    };
    BusinessProfileMobileComponent.prototype.loginOrNot = function () {
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.email = userData === null || userData === void 0 ? void 0 : userData.email;
        this.name = userData === null || userData === void 0 ? void 0 : userData.name;
        this.image = userData === null || userData === void 0 ? void 0 : userData.image;
        this.type = userData === null || userData === void 0 ? void 0 : userData.type;
        this.userName = userData === null || userData === void 0 ? void 0 : userData.userName;
    };
    BusinessProfileMobileComponent.prototype.openToggle = function () {
        this.leaveGroup = !this.leaveGroup;
    };
    BusinessProfileMobileComponent.prototype.logout = function () {
        this.storage.logout();
        this.router.navigate(['/login/' + this.type]);
    };
    BusinessProfileMobileComponent = __decorate([
        core_1.Component({
            selector: 'app-business-profile-mobile',
            templateUrl: './business-profile-mobile.component.html',
            styleUrls: ['./business-profile-mobile.component.scss']
        })
    ], BusinessProfileMobileComponent);
    return BusinessProfileMobileComponent;
}());
exports.BusinessProfileMobileComponent = BusinessProfileMobileComponent;
