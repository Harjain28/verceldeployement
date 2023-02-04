"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessProfileComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var BusinessProfileComponent = /** @class */ (function () {
    function BusinessProfileComponent(api, http, route, router) {
        this.api = api;
        this.http = http;
        this.route = route;
        this.router = router;
        this.customOptions2 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.customOptions3 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.customOptions4 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: false,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    }
    BusinessProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            _this.newtoken = localStorage.getItem("admintoken");
        });
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.email = this.fulldata.email;
        this.image = this.fulldata.image;
        this.phone = this.fulldata.mobileNo;
        this.name = this.fulldata.name;
        //console.log(this.fulldata, this.image, "this.this.image");
        this.getInfoText();
    };
    BusinessProfileComponent.prototype.getInfoText = function () {
        var _this = this;
        this.api.getInfoSection().subscribe(function (res) {
            var _a;
            _this.infoTextData = (_a = res === null || res === void 0 ? void 0 : res.sectionData[0]) === null || _a === void 0 ? void 0 : _a.description;
            //console.log(_this.infoTextData);
        });
    };
    BusinessProfileComponent.prototype.openToggle = function () {
        this.leaveGroup = !this.leaveGroup;
    };
    BusinessProfileComponent.prototype.handleadminroute = function (name) {
        this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
    };
    BusinessProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-business-profile',
            templateUrl: './business-profile.component.html',
            styleUrls: ['./business-profile.component.scss']
        })
    ], BusinessProfileComponent);
    return BusinessProfileComponent;
}());
exports.BusinessProfileComponent = BusinessProfileComponent;
