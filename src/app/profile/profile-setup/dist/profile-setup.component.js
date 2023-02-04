"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileSetupComponent = void 0;
var core_1 = require("@angular/core");
var ProfileSetupComponent = /** @class */ (function () {
    function ProfileSetupComponent(storage, router, api) {
        this.storage = storage;
        this.router = router;
        this.api = api;
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
    }
    ProfileSetupComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.email = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.email;
        this.image = (_b = this.fulldata) === null || _b === void 0 ? void 0 : _b.image;
        this.userName = (_c = this.fulldata) === null || _c === void 0 ? void 0 : _c.userName;
        this.name = (_d = this.fulldata) === null || _d === void 0 ? void 0 : _d.name;
        this.getUserProfileData();
    };
    ProfileSetupComponent.prototype.openToggle = function () {
        this.leaveGroup = !this.leaveGroup;
    };
    ProfileSetupComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    ProfileSetupComponent.prototype.getUserProfileData = function () {
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
    ProfileSetupComponent.prototype.logout = function () {
        this.storage.logout();
        this.router.navigate(['/login/student']);
    };
    ProfileSetupComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    ProfileSetupComponent.prototype.redirectToMarketplaceDetails = function (id) {
        this.router.navigate(["/view/marketplace-details/" + id]);
    };
    ProfileSetupComponent.prototype.getClassCategory = function (id) {
        this.router.navigate(["/view/class-details/" + id]);
    };
    ProfileSetupComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    ProfileSetupComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    ProfileSetupComponent.prototype.redirectionMorepage = function (type) {
        //console.log("type", type);
        this.router.navigate(["/profile/moreprofiledata/" + type]);
    };
    ProfileSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-setup',
            templateUrl: './profile-setup.component.html',
            styleUrls: ['./profile-setup.component.scss']
        })
    ], ProfileSetupComponent);
    return ProfileSetupComponent;
}());
exports.ProfileSetupComponent = ProfileSetupComponent;
