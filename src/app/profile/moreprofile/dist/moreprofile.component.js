"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MoreprofileComponent = void 0;
var core_1 = require("@angular/core");
var MoreprofileComponent = /** @class */ (function () {
    function MoreprofileComponent(storage, router, api, route) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.api = api;
        this.route = route;
        this.allProfileData = [];
        this.groupData = [];
        this.reviewData = [];
        this.classData = [];
        this.eventData = [];
        this.articleData = [];
        this.productsData = [];
        this.stars = [1, 2, 3, 4, 5];
        this.customOptions2 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                400: {
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                768: {
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                940: {
                    items: 4,
                    skip_validateItems: true,
                    loop: true
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
                    items: 3
                },
                740: {
                    items: 2
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
                    items: 3
                },
                740: {
                    items: 2
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.route.params.subscribe(function (params) {
            _this.types = params['type'];
            //console.log(_this.types);
        });
    }
    MoreprofileComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.email = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.email;
        this.image = (_b = this.fulldata) === null || _b === void 0 ? void 0 : _b.image;
        this.userName = (_c = this.fulldata) === null || _c === void 0 ? void 0 : _c.userName;
        this.name = (_d = this.fulldata) === null || _d === void 0 ? void 0 : _d.name;
        this.getUserProfileData();
    };
    MoreprofileComponent.prototype.openToggle = function () {
        this.leaveGroup = !this.leaveGroup;
    };
    MoreprofileComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    MoreprofileComponent.prototype.getUserProfileData = function () {
        var _this = this;
        this.api.get('userprofile').subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f;
            //console.log(res);
            _this.allProfileData = res.results;
            _this.groupData = (_a = _this.allProfileData[0]) === null || _a === void 0 ? void 0 : _a.groupData;
            _this.reviewData = (_b = _this.allProfileData[1]) === null || _b === void 0 ? void 0 : _b.reviewData;
            _this.classData = (_c = _this.allProfileData[2]) === null || _c === void 0 ? void 0 : _c.classData;
            _this.eventData = (_d = _this.allProfileData[3]) === null || _d === void 0 ? void 0 : _d.eventData;
            _this.articleData = (_e = _this.allProfileData[4]) === null || _e === void 0 ? void 0 : _e.articleData;
            _this.productsData = (_f = _this.allProfileData[5]) === null || _f === void 0 ? void 0 : _f.productsData;
        });
    };
    MoreprofileComponent.prototype.logout = function () {
        this.storage.logout();
        this.router.navigate(['/login/student']);
    };
    MoreprofileComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    MoreprofileComponent.prototype.redirectToMarketplaceDetails = function (id) {
        this.router.navigate(["/view/marketplace-details/" + id]);
    };
    MoreprofileComponent.prototype.getClassCategory = function (id) {
        this.router.navigate(["/view/class-details/" + id]);
    };
    MoreprofileComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    MoreprofileComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    MoreprofileComponent = __decorate([
        core_1.Component({
            selector: 'app-moreprofile',
            templateUrl: './moreprofile.component.html',
            styleUrls: ['./moreprofile.component.scss']
        })
    ], MoreprofileComponent);
    return MoreprofileComponent;
}());
exports.MoreprofileComponent = MoreprofileComponent;
