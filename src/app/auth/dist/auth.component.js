"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AuthComponent = /** @class */ (function () {
    function AuthComponent(router, location, event, storage) {
        this.router = router;
        this.location = location;
        this.event = event;
        this.storage = storage;
        this.getData();
    }
    AuthComponent.prototype.getData = function () {
        this.userData = localStorage.getItem('userType');
        //console.log(this.userData);
    };
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentURL = this.router.url;
        this.router.events.subscribe(function (res) {
            if (res instanceof router_1.NavigationEnd) {
                _this.currentURL = res.url;
            }
        });
    };
    // redirectTologin() {
    //   this.router.navigate(['/login/' + this.currentURL]);
    // }
    // redirectToRegsiter() {
    //   this.router.navigate(['/register/' + this]);
    // }
    AuthComponent.prototype.back = function () {
        this.event.sendEditEvent();
        if (this.currentURL === '/login/business' || '/login/student') {
            this.router.navigate(['/']);
        }
        else {
            this.location.back();
        }
    };
    AuthComponent = __decorate([
        core_1.Component({
            selector: 'app-auth',
            templateUrl: './auth.component.html',
            styleUrls: ['./auth.component.scss']
        })
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
